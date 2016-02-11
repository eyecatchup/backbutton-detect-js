/*!
 * Back Button Detection Object V 1.0.1
 * http://www.brookebryan.com/
 *
 * Copyright 2010, Brooke Bryan
 *
 * Date: Thu 27 Jan 2011 13:37 GMT
 */

var bajb_backdetect = {
	Version: '1.0.0',
	Description: 'Back Button Detection',

	Browser: {
		IE:     !!(window.attachEvent && !window.opera),
		Safari:	navigator.userAgent.indexOf('Apple') > -1,
		Opera:	!!window.opera
	},

	FrameLoaded: 0,
	FrameTry:0,
	FrameTimeout: null,

	OnBack: function(){
		alert('Back Button Clicked');
	},

	BAJBFrame: function(){
		var BAJBOnBack = document.getElementById('BAJBOnBack');
		if(bajb_backdetect.FrameLoaded > 1)
		{
			if(bajb_backdetect.FrameLoaded == 2)
			{
				bajb_backdetect.OnBack();
				history.back();
			}
		}
		bajb_backdetect.FrameLoaded++;
		if(bajb_backdetect.FrameLoaded == 1)
		{
			if(bajb_backdetect.Browser.IE)
			{
				bajb_backdetect.SetupFrames();
			}
			else
			{
				bajb_backdetect.FrameTimeout = setTimeout("bajb_backdetect.SetupFrames();",700);
			}
		}
	},

	SetupFrames: function()
	{
		clearTimeout(bajb_backdetect.FrameTimeout);
		var BBiFrame = document.getElementById('BAJBOnBack');
		var checkVar = BBiFrame.src.substr(-11,11);

		if(bajb_backdetect.FrameLoaded == 1 && checkVar != "HistoryLoad")
		{
			BBiFrame.src = "blank.html?HistoryLoad";
		}
		else
		{
			if(bajb_backdetect.FrameTry < 2 && checkVar != "HistoryLoad")
			{
				bajb_backdetect.FrameTry++;
				bajb_backdetect.FrameTimeout = setTimeout("bajb_backdetect.SetupFrames();",700);
			}
		}
	},

	SafariHash: 'false',
	Safari: function()
	{
		if(bajb_backdetect.SafariHash == 'false')
		{
			if(window.location.hash == '#b')
			{
				bajb_backdetect.SafariHash = 'true';
			}
			else
			{
				window.location.hash = '#b';
			}
			setTimeout("bajb_backdetect.Safari();",100);
		}
		else if(bajb_backdetect.SafariHash == 'true')
		{
			if(window.location.hash == '')
			{
				bajb_backdetect.SafariHash = 'back';
				bajb_backdetect.OnBack();
				history.back();
			}
			else
			{
				setTimeout("bajb_backdetect.Safari();",100);
			}
		}
	},

	Initialise: function()
	{
		if(bajb_backdetect.Browser.Safari)
		{
			setTimeout("bajb_backdetect.Safari();",600);
		}
		else
		{
			document.write('<iframe src="blank.html" style="display:none;" id="BAJBOnBack" onunload="alert(\'de\')" onload="bajb_backdetect.BAJBFrame();"></iframe>');
		}
	}
};
bajb_backdetect.Initialise();
