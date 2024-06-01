import json
import os
from django.conf import settings


def get_vite_manifest():
    manifest_path = os.path.join(
        settings.BASE_DIR, 'react', 'dist', '.vite', 'manifest.json')
    with open(manifest_path) as f:
        return json.load(f)


def get_bundle_files():
    manifest = get_vite_manifest()
    js_files = []
    css_files = []

    for entry_data in manifest.values():
        entry_js_files = entry_data.get('file')
        if entry_js_files:
            if isinstance(entry_js_files, str):
                js_files.append(entry_js_files)
            else:
                js_files.extend(entry_js_files)

        entry_css_files = entry_data.get('css')
        if entry_css_files:
            if isinstance(entry_css_files, str):
                css_files.append(entry_css_files)
            else:
                css_files.extend(entry_css_files)

    # for entry_data in manifest.values():
    #     entry_js_files = entry_data.get('file', [])
    #     entry_css_files = entry_data.get('css', [])

    # if isinstance(entry_js_files, str):
    #     entry_js_files = [entry_js_files]
    # if isinstance(entry_css_files, str):
    #     entry_css_files = [entry_css_files]
    # js_files.extend(entry_js_files)
    # css_files.extend(entry_css_files)

    return js_files, css_files
