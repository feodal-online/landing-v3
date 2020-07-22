from unittest import TestCase

import requests


class ProdRedirectsTestCase(TestCase):
    base_url = 'https://feodal.online/'
    paths = [
        'about.html',
        'audit.html',
        'cadastral.html',
        'changes.html',
        'check.html',
        'map-visualisation.html',
        'observation.html',
    ]

    def url(self, path=''):
        return f'{self.base_url}{path}'

    def test_root(self):
        response = requests.get(self.url(), allow_redirects=False)
        self.assertEqual(response.status_code, 200)

    def test_root_index(self):
        response = requests.get(self.url('index.html'), allow_redirects=False)
        self.assertEqual(response.status_code, 301)
        self.assertEqual(response.next.url, self.url(''))

    def test_ukr(self):
        response = requests.get(self.url('ukr/'), allow_redirects=False)
        self.assertEqual(response.status_code, 301)
        self.assertEqual(response.next.url, self.url(''))

    def test_ukr_index(self):
        response = requests.get(self.url('ukr/index.html'), allow_redirects=False)
        self.assertEqual(response.status_code, 301)
        self.assertEqual(response.next.url, self.url(''))

    def test_ru(self):
        response = requests.get(self.url('ru/'), allow_redirects=False)
        self.assertEqual(response.status_code, 200)

    def test_ru_index(self):
        response = requests.get(self.url('ru/index.html'), allow_redirects=False)
        self.assertEqual(response.status_code, 301)
        self.assertEqual(response.next.url, self.url('ru/'))

    def test_root_html(self):
        for path in self.paths:
            response = requests.get(self.url(path), allow_redirects=False)
            self.assertEqual(response.status_code, 301)
            self.assertEqual(response.next.url, self.url(f'ukr/{path}'))

    def test_ukr_html(self):
        for path in self.paths:
            response = requests.get(self.url(f'ukr/{path}'), allow_redirects=False)
            self.assertEqual(response.status_code, 200)

    def test_ru_html(self):
        for path in self.paths:
            response = requests.get(self.url(f'ru/{path}'), allow_redirects=False)
            self.assertEqual(response.status_code, 200)
