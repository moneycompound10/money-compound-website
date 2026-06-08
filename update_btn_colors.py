import os
import re

directories = [
    r'C:\Users\Asus\Desktop\merge-code-moneycompund-main\src\pages\services',
    r'C:\Users\Asus\Desktop\merge-code-moneycompund-main\src\pages\products'
]

old_cls = 'px-10 py-5 bg-slate-950 text-white rounded-full font-bold text-[13px] hover:bg-slate-800 transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest'
new_cls = 'px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest'

count = 0
for directory in directories:
    for filename in os.listdir(directory):
        if filename.endswith('.jsx'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = content.replace(old_cls, new_cls)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated: {filename}')
                count += 1

print(f'\nTotal files updated: {count}')
