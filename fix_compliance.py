import os
import re

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(filepath, 'r', encoding='utf-16') as f:
            content = f.read()

    original_content = content

    # Protect mandatory SEBI disclaimers and URLs/Imports
    protected_phrases = [
        ("SEBI-registered Investment Adviser", "%%PROTECTED_SEBI_1%%"),
        ("separate advisory fee", "%%PROTECTED_SEBI_2%%"),
        ("investment advisory services", "%%PROTECTED_SEBI_3%%"),
        ("SEBI (Investment Advisers) Regulations", "%%PROTECTED_SEBI_4%%"),
        ("wealthmagic.in", "%%PROTECTED_URL_1%%"),
        ("wealthmagic", "%%PROTECTED_URL_2%%"),
        ("WealthMagic", "%%PROTECTED_URL_3%%"),
        ("moneycompound.wealthmagic.in", "%%PROTECTED_URL_4%%")
    ]
    
    for phrase, placeholder in protected_phrases:
        content = content.replace(phrase, placeholder)

    # Replacements
    replacements = [
        (r'\bWealth Management\b', 'Investment Services'),
        (r'\bwealth management\b', 'investment services'),
        (r'\bWealth Advisor\b', 'Mutual Fund Distributor'),
        (r'\bWealth Partner\b', 'Investment Partner'),
        (r'\bwealth partner\b', 'investment partner'),
        (r'\bWealth Adviser\b', 'Mutual Fund Distributor'),
        (r'\bWealth Services\b', 'Investment Services'),
        (r'\bWealth Solutions\b', 'Investment Solutions'),
        (r'\bwealth solutions\b', 'investment solutions'),
        (r'\bWealth Creation\b', 'Portfolio Growth'),
        (r'\bwealth creation\b', 'portfolio growth'),
        (r'\bWealth Clinic\b', 'Investment Clinic'),
        (r'\bwealth clinics\b', 'investment clinics'),
        (r'\bLearn Wealth\b', 'Learn Investing'),
        (r'\bYour Wealth\b', 'Your Portfolio'),
        (r'\byour wealth\b', 'your portfolio'),
        (r'\bGrow Your Wealth\b', 'Grow Your Portfolio'),
        (r'\bgrow your wealth\b', 'grow your portfolio'),
        (r'\bElite Wealth\b', 'Elite Portfolio'),
        (r'\bGenerational Wealth\b', 'Generational Assets'),
        (r'\bgenerational wealth\b', 'generational assets'),
        (r'\bBuild your wealth\b', 'Build your portfolio'),
        (r'\bbuild your wealth\b', 'build your portfolio'),
        (r'\bWealth Journey\b', 'Investment Journey'),
        (r'\bwealth journey\b', 'investment journey'),
        (r'\bWealth guidance\b', 'Investment guidance'),
        (r'\bwealth guidance\b', 'investment guidance'),
        (r'\bHNI Wealth\b', 'HNI Portfolio'),
        (r'\bNRI Wealth\b', 'NRI Portfolio'),
        (r'\bWealth Stewardship\b', 'Asset Stewardship'),
        (r'\bWealth without a goal\b', 'Money without a goal'),
        (r'\bWealth with a goal\b', 'Money with a goal'),
        (r'\bWealth is not about\b', 'Investing is not about'),
        (r'\bAdvisors\b', 'Professionals'),
        (r'\badvisors\b', 'professionals'),
        (r'\bAdvisor\b', 'Professional'),
        (r'\badvisor\b', 'professional'),
        (r'\bAdviser\b', 'Professional'),
        (r'\badviser\b', 'professional'),
        (r'\bWealth\b', 'Investments'), # Catch remaining 'Wealth'
        (r'\bwealth\b', 'investments'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    # Restore protected phrases
    for phrase, placeholder in protected_phrases:
        content = content.replace(placeholder, phrase)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def main():
    src_dir = r"c:\Users\Dell\Desktop\new website\MoneyCompound\src"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.jsx', '.js', '.ts', '.tsx')):
                filepath = os.path.join(root, file)
                process_file(filepath)

if __name__ == '__main__':
    main()
