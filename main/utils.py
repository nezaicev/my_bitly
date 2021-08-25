import secrets


def generate_url_subpart(complexity):
    return secrets.token_urlsafe(complexity)