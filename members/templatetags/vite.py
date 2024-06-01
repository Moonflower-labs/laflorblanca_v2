from django import template
from django.conf import settings
from members.utils import get_bundle_files
from django.utils.html import format_html
from django.utils.safestring import mark_safe


register = template.Library()


@register.simple_tag
def load_vite_bundles():
    js_files, css_files = get_bundle_files()
    tags = ''

    for css_file in css_files:
        tags += format_html('<link rel="stylesheet" href="{}{}">\n',
                            settings.STATIC_URL, css_file)
    for js_file in js_files:
        tags += format_html('<script type="module" src="{}{}"></script>\n',
                            settings.STATIC_URL, js_file)

    return mark_safe(tags)
