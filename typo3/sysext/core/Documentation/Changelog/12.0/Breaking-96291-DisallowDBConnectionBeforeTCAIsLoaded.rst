.. include:: /Includes.rst.txt

==============================================================
Breaking: #96291 - Disallow DB connection before TCA is loaded
==============================================================

See :issue:`96291`

Description
===========

Accessing the database API before TCA is loaded
is considered to be a logic mistake, as TCA is required
to generate the expected database schema.


Impact
======

Extensions that access the TYPO3 database API in
ext_localconf.php files or TCA files will not work
any more, because TYPO3 will throw an exception in this case.


Affected Installations
======================

TYPO3 installations with third party extensions,
that access database API before TCA is loaded.


Migration
=========

Database API can be accessed earliest in `BootCompleted` event.

.. index:: Database, NotScanned, ext:core
