import os

# ==========================================
# تنظیمات اصلی پروژه TivanEx
# ==========================================
PROJECT_NAME = "tivan-ex"
ROOT_PATH = r"C:\projects\tivan-ex"
OUTPUT_FILE = os.path.join(ROOT_PATH, f"{PROJECT_NAME}_snapshot.txt")
# ==========================================

# پوشه‌هایی که باید نادیده گرفته شوند
EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".vscode",
    ".idea",
    "dist",
    "build",
    "out",
}

# فایل‌هایی که باید نادیده گرفته شوند
EXCLUDE_FILES = {
    ".gitignore",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "icon.png",
    "project_tree_with_content.py", # خود فایل اسکریپت
    os.path.basename(OUTPUT_FILE),  # فایل خروجی جدید
    "vira_exchange_snapshot.txt",   # فایل قدیمی (اگر هنوز باشد)
    "run_snapshot.bat",
}

# پسوند فایل‌هایی که محتواشون چاپ میشه
TEXT_EXTENSIONS = {
    ".ts", ".tsx", ".js", ".jsx",
    ".json", ".md", ".css", ".html",
    ".mjs", ".cjs", ".txt", ".env.example"
}


def write_tree(path, file, prefix=""):
    try:
        items = sorted(os.listdir(path))
    except PermissionError:
        return

    items = [
        item for item in items
        if item not in EXCLUDE_DIRS and item not in EXCLUDE_FILES
    ]

    for index, item in enumerate(items):
        full_path = os.path.join(path, item)
        is_last = index == len(items) - 1

        connector = "└── " if is_last else "├── "
        file.write(prefix + connector + item + "\n")

        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            write_tree(full_path, file, prefix + extension)


def is_inside_public(path):
    public_path = os.path.join(ROOT_PATH, "public")
    try:
        return os.path.commonpath([public_path, path]) == public_path
    except ValueError:
        return False


def write_file_contents(path, file):
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        for name in files:
            if name in EXCLUDE_FILES:
                continue
            
            # اطمینان از اینکه فایل خروجی اسکن نشود
            if name == os.path.basename(OUTPUT_FILE):
                continue

            full_path = os.path.join(root, name)

            if is_inside_public(full_path):
                continue

            ext = os.path.splitext(name)[1]
            if ext not in TEXT_EXTENSIONS:
                continue

            relative_path = os.path.relpath(full_path, ROOT_PATH)

            file.write("\n" + "=" * 80 + "\n")
            file.write(f"📄 FILE: {relative_path}\n")
            file.write("=" * 80 + "\n\n")

            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    file.write(f.read())
            except UnicodeDecodeError:
                file.write("❌ [امکان خواندن فایل به صورت متنی وجود ندارد]\n")


def main():
    if not os.path.exists(ROOT_PATH):
        print(f"❌ خطا: مسیر {ROOT_PATH} پیدا نشد!")
        return

    print(f"🔄 در حال ساخت اسنپ‌شات جدید برای {PROJECT_NAME}...")
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("📁 PROJECT STRUCTURE\n")
        f.write("=" * 80 + "\n\n")
        f.write(f"{PROJECT_NAME}\n")
        write_tree(ROOT_PATH, f)

        f.write("\n\n📄 FILE CONTENTS\n")
        f.write("=" * 80 + "\n")
        write_file_contents(ROOT_PATH, f)

    print("✅ انجام شد!")
    print(f"📄 فایل خروجی جدید: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()