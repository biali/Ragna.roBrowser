/**
 * Plugins/PluginManager.js
 *
 * Plugin Manager - Load and execute plugins
 * Plugins have to be globals, can not be server specific (multiple server in one clientinfo)
 * You alter memory, so you can't restore it if you change server.
 *
 * It's a work in progress, and subject to changes.
 *
 * To add plugins use the "plugins" param to list plugins in the ROBrowser Config. Plugins must be located in the /Plugin/ folder.
 *
 * Usage:
 * 		plugins: {
 *					<plugin_1_name>: '<plugin_1_path>',
 *					<plugin_2_name>: '<plugin_2_path>',
 *					<plugin_3_name>: '<plugin_3_path>',
 *					...
 *					<plugin_n_name>: '<plugin_n_path>'
 *				},
 *
 * Example:
 * 		plugins:		{ KeyboardControl: 'KeyToMove_v1/KeyToMove' },
 *
 *
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	/**
	 * Plugins are loaded from configs
	 */
	var Configs = require('Core/Configs');


	/**
	 * Plugin namespace
	 */
	var Plugins = {};


	/**
	 * @var {Array} plugin list
	 */
	Plugins.list = [];


	/**
	 * Initialize plugins
	 */
	Plugins.init = function init( context )
	{
		
		var paths = [];
		var i, count;

		this.list  = Configs.get('plugins', {});

		for (const [pluginName, pluginPath] of Object.entries(this.list)) {
			paths.push('./' + pluginPath);
		}
		
		count = paths.length;
		
		require(paths, function() {
			for (i = 0; i < count; ++i) {
				if(arguments[i]()) {
					console.log('[PluginManager] Initialized plugin: ' + paths[i]);
				} else {
					console.error('[PluginManager] Failed to intialize plugin: ' + paths[i]);
				}
			}
		});
	};


	/**
	 * Export
	 */
	return Plugins;
});
