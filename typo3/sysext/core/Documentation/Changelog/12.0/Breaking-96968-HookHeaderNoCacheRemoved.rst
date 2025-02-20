.. include:: /Includes.rst.txt

===============================================
Breaking: #96968 - Hook "headerNoCache" removed
===============================================

See :issue:`96968`

Description
===========

The previous TYPO3 Hook "headerNoCache" registered via
:php:`$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tslib/class.tslib_fe.php']['headerNoCache']`
has been removed in favor of a new PSR-14 Event
:php:`ShouldUseCachedPageDataIfAvailableEvent`.


Impact
======

Hooks in third-party extensions will not be executed anymore.


Affected Installations
======================

TYPO3 installations with custom extensions using this hook.


Migration
=========

Register a new PSR-14 event listener for :php:`ShouldUseCachedPageDataIfAvailableEvent`
in the extensions' Services.yaml to keep TYPO3 v12+ compatibility.

Extensions can then provide compatibility with TYPO3 v11 and TYPO3 v12 at
the same time.

.. index:: Frontend, PHP-API, FullyScanned, ext:frontend
