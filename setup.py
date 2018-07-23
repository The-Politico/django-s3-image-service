from setuptools import find_packages, setup

setup(
    name='django-s3-image-service',
    version='0.0.3',
    description='Handle s3 image uploads via API with some sizing and processing options.',
    url='https://github.com/The-Politico/django-s3-image-service',
    author='POLITICO interactive news',
    author_email='interactives@politico.com',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: Django',
        'Framework :: Django :: 2.0',
        'Intended Audience :: Developers',
        'Intended Audience :: Information Technology',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Topic :: Internet :: WWW/HTTP',
    ],
    keywords='',
    packages=find_packages(exclude=['docs', 'tests', 'example']),
    include_package_data=True,
    install_requires=[],
    extras_require={
        'test': ['pytest'],
    },
)
