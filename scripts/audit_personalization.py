#!/usr/bin/env python3
"""Report known demo identity residue without printing resume/source text.

Exit codes: 0 no known residue; 1 known demo matches; 2 invalid input/read error.
This is a heuristic review aid, not semantic or visual validation.
"""

import argparse
import json
import re
import sys
from pathlib import Path


TEXT_SUFFIXES = {
    ".html", ".htm", ".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx",
    ".css", ".scss", ".json", ".svg", ".txt", ".xml", ".webmanifest",
}
SKIP_DIRS = {"node_modules", "dist", ".git", ".cache", "coverage", "__pycache__"}
NOTE_IDS = (
    "6ae5d6ad000000000e02f631", "6ae4925a0000000006031e28",
    "6a1d63dc0000000007023e15", "69cfd889000000001f002566",
    "69aaf798000000000d00b74e", "69a0745c000000002800a1e8",
    "6985e8d5000000001a023702", "6977923c0000000028009352",
    "69734d4e000000002801ea2f",
)
PATTERNS = [
    ("示例姓名", r"(?<![A-Za-z])(?:atuntun|atutun|atun)(?![A-Za-z])|阿囤囤"),
    ("胸卡第二行姓名", r"fillText\(\s*['\"]tun['\"]|<(?:b|span)>tun</"),
    ("示例邮箱", r"panggungun24@163\.com"),
    ("示例肖像路径", r"(?:atutun|atuntun)-avatar\.(?:jpe?g|png|webp)"),
    ("示例学校", r"厦门大学|兰州大学|台湾交通大学"),
    ("示例雇主/业务", r"字节跳动|ByteDance|火山引擎|飞连|Data[·\s-]*内容"),
    ("示例职位", r"Commercial Product Manager|商业化平台产品经理|中台产品经理|商业化产品经理"),
    ("示例定位/简介", r"I build enterprise products|Security\s*[·/]\s*Risk|聚焦安全、风控、权限与终端产品|从种子客户验证一直做到商业增长"),
    ("示例项目", r"\bEDLP\b|软件资产管理|权限中台"),
    ("示例量化成绩", r"250%\+|170%\+|130%\+|GPA\s*3\.96\s*/\s*4|GPA\s*4\.91\s*/\s*5|专业排名\s*3\s*/\s*45|专业排名\s*1\s*/\s*29"),
    ("示例原帖链接", "|".join(NOTE_IDS)),
    ("示例原帖标题", r"建议找工作的朋友|没有团队，我靠|每天都看到，但到底啥是|我想当\s*AI\s*产品经理|10\s*分钟讲透|到底什么是\s*Vibe\s*Coding|完全不碰代码怎么做产品|把\s*GitHub\s*开源项目扒下来|学\s*AI\s*的第一步"),
]
COMPILED = [(label, re.compile(pattern, re.IGNORECASE)) for label, pattern in PATTERNS]
MISSING = "#此部分缺失内容"


def runtime_files(root):
    """Only inspect the shipped runtime, not README, source resumes or templates."""
    yield root / "index.html"
    for directory in (root / "src", root / "public"):
        if not directory.exists():
            continue
        for path in sorted(directory.rglob("*")):
            if path.is_symlink() or not path.is_file():
                continue
            if SKIP_DIRS.intersection(path.relative_to(root).parts):
                continue
            if path.suffix.lower() in TEXT_SUFFIXES:
                yield path


def audit(root):
    if not root.is_dir():
        raise ValueError("目标不是目录")
    if not (root / "index.html").is_file() or not (root / "src").is_dir():
        raise ValueError("目标应为生成网站根目录，包含 index.html 和 src/")
    findings, missing = [], []
    count = 0
    for path in runtime_files(root):
        if path.is_symlink():
            raise ValueError("入口文件不可为符号链接")
        relative = path.relative_to(root).as_posix()
        raw = path.read_bytes()
        if b"\0" in raw:
            continue
        try:
            content = raw.decode("utf-8-sig")
        except UnicodeDecodeError:
            continue
        count += 1
        for number, line in enumerate(content.splitlines(), 1):
            labels = [label for label, pattern in COMPILED if pattern.search(line)]
            if labels:
                findings.append({"path": relative, "line": number, "matches": labels})
            occurrences = line.count(MISSING)
            if occurrences:
                missing.append({"path": relative, "line": number, "count": occurrences})
    return {
        "scanned_text_files": count,
        "sample_matches": findings,
        "missing_content": missing,
        "limitation": "仅检测内置示例特征；未检查二进制图片、语义事实或页面视觉。",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("website", type=Path, help="生成网站的根目录")
    parser.add_argument("--json", action="store_true", help="输出结构化结果，不输出源文本")
    args = parser.parse_args()
    try:
        result = audit(args.website.expanduser().resolve())
    except (OSError, ValueError) as error:
        print(f"审查失败：{error}", file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"已扫描 {result['scanned_text_files']} 个运行时文本文件。")
        for finding in result["sample_matches"]:
            print(f"[示例待核对] {finding['path']}:{finding['line']} — {'、'.join(finding['matches'])}")
        for item in result["missing_content"]:
            print(f"[缺失内容] {item['path']}:{item['line']} — {item['count']} 处标记")
        print(f"示例匹配行：{len(result['sample_matches'])}；缺失标记：{sum(item['count'] for item in result['missing_content'])}。")
        print(result["limitation"])
        print("相同公司/职位可能是真实用户资料，需人工复核；无匹配不等于全部个性化完成。")
    return 1 if result["sample_matches"] else 0


if __name__ == "__main__":
    sys.exit(main())
