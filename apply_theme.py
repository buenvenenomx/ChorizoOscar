import os
import re

file_path = r"c:\Users\Oscar\Documents\GitHub\ChorizoOscar\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Update colors config
config_old = """          colors: {
            'oscar-orange': '#f37021',
            'oscar-red': '#be1e2d',
            'oscar-yellow': '#ffc20e',
            'oscar-cream': '#fff9e6',
            'oscar-teal': '#008b8b',
            'oscar-dark': '#2b2b2b',
          },"""
config_new = """          colors: {
            'oscar-red': '#be1e2d',
            'norteno-bg': '#15110f',
            'norteno-card1': '#241b16',
            'norteno-card2': '#3b261b',
            'norteno-accent': '#d27921',
            'norteno-text': '#ead9c6',
          },"""
if config_old in text:
    text = text.replace(config_old, config_new)
else:
    print("Warning: Old config not found exactly as expected.")

# 2. Map old classes
mapping = {
    'bg-oscar-cream': 'bg-norteno-bg',
    'text-oscar-dark': 'text-norteno-text',
    'bg-oscar-dark text-white': 'bg-norteno-card1 text-norteno-text',
    'bg-white shadow-2xl border border-oscar-orange/20': 'bg-norteno-card1 shadow-2xl border-b border-norteno-accent/20',
    'hover:text-oscar-orange': 'hover:text-norteno-accent',
    'bg-oscar-yellow': 'bg-norteno-card2',
    'bg-oscar-orange': 'bg-norteno-accent',
    'text-oscar-red': 'text-oscar-red drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]',
    'text-oscar-dark max-w-lg': 'text-norteno-text max-w-lg drop-shadow-md',
    'hover:bg-oscar-dark': 'hover:bg-norteno-card1',
    'py-24 bg-oscar-orange': 'py-24 bg-norteno-bg border-y border-norteno-card2',
    'bg-oscar-cream p-10': 'bg-norteno-card1 p-10 shadow-lg border border-norteno-accent/10',
    'bg-oscar-yellow p-10': 'bg-norteno-card2 p-10 shadow-lg border border-norteno-accent/10',
    'bg-oscar-red w-16 h-16': 'bg-oscar-red w-16 h-16 shadow-md',
    'bg-oscar-dark w-16 h-16': 'bg-norteno-bg w-16 h-16 shadow-md',
    'text-white transform': 'text-norteno-text transform',
    'bg-oscar-yellow w-16 h-16': 'bg-norteno-accent w-16 h-16 text-norteno-bg shadow-md',
    'py-24 bg-oscar-cream': 'py-24 bg-norteno-bg',
    'text-5xl md:text-7xl text-oscar-dark': 'text-5xl md:text-7xl text-norteno-accent drop-shadow-md',
    'bg-oscar-yellow p-8': 'bg-norteno-card2 p-8 border border-norteno-accent/20',
    'bg-oscar-teal p-8': 'bg-norteno-card1 p-8 border border-norteno-accent/20',
    'group-hover:bg-oscar-red': 'group-hover:bg-oscar-red',
    'group-hover:bg-oscar-dark': 'group-hover:bg-norteno-bg',
    'group-hover:bg-oscar-yellow': 'group-hover:bg-norteno-accent',
    'text-white group-hover:text-oscar-dark': 'text-norteno-text group-hover:text-norteno-bg',
    'bg-oscar-teal py-24': 'bg-norteno-bg py-24 border-t border-norteno-card2 relative',
    'bg-oscar-dark p-6 rounded-full': 'bg-norteno-card1 p-6 rounded-full shadow-lg',
    'border-4 border-white': 'border-4 border-norteno-accent',
    'bg-oscar-red p-6 rounded-full': 'bg-oscar-red p-6 rounded-full shadow-lg',
    'bg-oscar-yellow p-6 rounded-full': 'bg-norteno-accent p-6 rounded-full text-norteno-bg shadow-lg',
    'text-white animate-float': 'text-norteno-bg animate-float', # for yellow step 3
    'bg-oscar-dark text-oscar-cream pt-20': 'bg-norteno-bg text-norteno-text pt-20 border-t border-norteno-card2',
    'text-oscar-orange opacity-90': 'text-norteno-accent opacity-90 drop-shadow-md',
}

for k, v in mapping.items():
    text = text.replace(k, v)

# additional fixes
text = text.replace('class="bg-white', 'class="bg-norteno-card1')
text = text.replace('bg-oscar-red p-8', 'bg-oscar-red p-8 border border-norteno-accent/20')
text = text.replace('bg-white opacity-20 -z-10', 'bg-norteno-accent opacity-30 -z-10')
text = text.replace('min-h-[80vh] flex items-center justify-center overflow-hidden', 'min-h-[80vh] flex items-center justify-center overflow-hidden bg-[url(\\\'https://www.transparenttextures.com/patterns/black-linen-2.png\\\')] bg-black/40 bg-blend-multiply')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Done writing theme updates.")
