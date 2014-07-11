<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'test');

/** MySQL database username */
define('DB_USER', 'chaos');

/** MySQL database password */
define('DB_PASSWORD', 'wangyaWOAINI51');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'D1!k~jKFNVglY*O1RCfZ)_J3FI=+@f:2H/Bt;(fLjbF|&3gCz5XV6G9f.q# >&oZ');
define('SECURE_AUTH_KEY',  'Ie8s=tS8,n{i]5:)]eB2+# rirybu}Q]*&U01cy<]*a.C[_n0#<t8WCx!MNV1R+3');
define('LOGGED_IN_KEY',    '1L;,J<DV<ZI81p]N%tD te(|G~t*#B)EP(,OnF|}Ss/rz4xY]RmXx4eRGe:-+B!b');
define('NONCE_KEY',        'fGtxk,K=S@!6mQb;3p-=7CRFrRd7+ETd7LjN0-Rj|8Cfm<{[!N.d4/=2g,+Fu-b=');
define('AUTH_SALT',        'oF4|s7+;Jf))2;wo5IcXx!+y]P)ti|fNCvQ_&i(8[3RSJ|S~XjFENprhKjv|`2tc');
define('SECURE_AUTH_SALT', '~N<]GjTKn+T?C;Zr-M~c4<p>J}dYIz_|l@*O^cXy;2/q3Qh[?p+$Fd>A_Y^B|jX<');
define('LOGGED_IN_SALT',   'o~!o`aiiD?FO-MRf}W(!Yr*N2TvefmIb8-Z.?J`L(s>mx$-B6Ox+X8YpxJA)V>-3');
define('NONCE_SALT',       'ry*^NBjE$UTn HV)U-Pwdo~]b2{ {(;tVI^Py!+:51`oVBnoq96i+y5RnH/ J>|*');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
