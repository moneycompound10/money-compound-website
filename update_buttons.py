import os
import re

directories = [
    r'C:\Users\Asus\Desktop\merge-code-moneycompund-main\src\pages\services',
    r'C:\Users\Asus\Desktop\merge-code-moneycompund-main\src\pages\products'
]

pattern = re.compile(r'(\s*)(.*?)\s*(<ArrowRight className="group-hover:translate-x-1 transition-transform" />)')

for directory in directories:
    for filename in os.listdir(directory):
        if filename.endswith('.jsx'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace the text before ArrowRight
            new_content = pattern.sub(r'\1Get Started \3', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filename}')
