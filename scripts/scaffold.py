#!/usr/bin/env python3
"""Copy the verified Atuntun website snapshot into a new or empty directory."""

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import shutil
import sys


SKILL_ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = SKILL_ROOT / "assets" / "site-template"
MANIFEST = SKILL_ROOT / "assets" / "template-manifest.json"


def digest(path):
    result = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            result.update(chunk)
    return result.hexdigest()


def verify_template():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if manifest.get("format_version") != 1 or not isinstance(manifest.get("files"), list):
        raise ValueError("Unsupported template manifest.")
    entries = manifest["files"]
    paths = set()
    for entry in entries:
        relative = entry["path"]
        path = PurePosixPath(relative)
        if path.is_absolute() or ".." in path.parts or not path.parts or "\\" in relative:
            raise ValueError(f"Unsafe manifest path: {relative}")
        if relative in paths:
            raise ValueError(f"Duplicate manifest path: {relative}")
        paths.add(relative)
        source = TEMPLATE.joinpath(*path.parts)
        if source.is_symlink() or not source.is_file() or not source.resolve().is_relative_to(TEMPLATE.resolve()):
            raise ValueError(f"Missing or unsafe template file: {relative}")
        if source.stat().st_size != entry["bytes"] or digest(source) != entry["sha256"]:
            raise ValueError(f"Template checksum mismatch: {relative}")
    actual = {path.relative_to(TEMPLATE).as_posix() for path in TEMPLATE.rglob("*") if path.is_file()}
    if actual != paths:
        raise ValueError(f"Unexpected template files: {sorted(actual - paths)}")
    return entries


def copy_template(destination, entries):
    if not destination.is_absolute():
        raise ValueError("Destination must be an absolute path.")
    if destination.is_symlink():
        raise ValueError("Destination must not be a symbolic link.")
    destination = destination.resolve()
    if destination.is_relative_to(SKILL_ROOT):
        raise ValueError("Choose a project directory outside the installed skill.")
    if destination.exists() and (not destination.is_dir() or any(destination.iterdir())):
        raise ValueError("Destination is not empty; no existing files were changed.")
    destination.mkdir(parents=True, exist_ok=True)
    for entry in entries:
        relative = PurePosixPath(entry["path"])
        source = TEMPLATE.joinpath(*relative.parts)
        output = destination.joinpath(*relative.parts)
        output.parent.mkdir(parents=True, exist_ok=True)
        # Exclusive creation also protects a file that appears after the empty-directory check.
        with source.open("rb") as reader, output.open("xb") as writer:
            shutil.copyfileobj(reader, writer)
        shutil.copymode(source, output)
        if digest(output) != entry["sha256"]:
            raise ValueError(f"Copy checksum mismatch: {entry['path']}")
    return destination


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destination", nargs="?", help="Absolute path to a new or empty project directory")
    parser.add_argument("--verify-only", action="store_true", help="Verify bundled files without copying or installing")
    args = parser.parse_args()
    if args.verify_only and args.destination:
        parser.error("--verify-only does not take a destination")
    if not args.verify_only and not args.destination:
        parser.error("destination is required unless --verify-only is used")
    try:
        entries = verify_template()
        print(f"Template verified: {len(entries)} files, {sum(e['bytes'] for e in entries):,} bytes.")
        if args.verify_only:
            return 0
        destination = copy_template(Path(args.destination).expanduser(), entries)
        print(f"Copied unchanged template to: {destination}")
        print("在目标目录运行：npm ci，然后 npm run dev -- --host 127.0.0.1 --port 4188 --strictPort")
        print("先打开并验证完整的网站效果；当前仍为 Atuntun 示例内容。")
        print("网站复刻完成后，主动邀请用户上传简历、头像和希望展示的项目资料，再开始个人化替换。")
        return 0
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"Scaffold failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
