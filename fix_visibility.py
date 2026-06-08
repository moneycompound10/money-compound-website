import os

base_path = r'c:\Users\Asus\Desktop\animated website\MoneyCompound-featureshreya\src\pages'

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.jsx'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('text-white/60', 'text-white')
            new_content = new_content.replace('text-white/50', 'text-white')
            new_content = new_content.replace('text-white/40', 'text-white')
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated: {file_path}")
