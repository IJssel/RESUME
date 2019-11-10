checkCurrentNav();
setPage();


/* setPage
============================================================================================================ */
function setPage() {
	// first
	$('#topSection .main_lead').children().addBack().contents().each(function() {
		if (this.nodeType == 3) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span><span>$1</span></span>'));
		}
	});

	var nimg = $(new Image());
	nimg.bind('load', function() {
		$('#header').addClass('show');
		$('#topSection').addClass('show');

		$('#topSection .main_lead > span').each(function(i) {
			showTopTxt($(this), i);
		})
	});
	nimg.attr('src', $('#topSection').attr('data-bg'));
	function showTopTxt(ele,i) {
		setTimeout(function(){
			ele.addClass("show");
		},30*i + 500);
	}


	// news
	$('#topSection .news .btn').on('click', function() {
		$(this).toggleClass('open');
		if($(this).hasClass('open')) {
			$('#topSection .news .more').css('height', $('#topSection .news .more > *').outerHeight());
		} else {
			$('#topSection .news .more').css('height', 0);
		}
		return false;
	})
	$('#topSection .news li a[data-news]').on('click', function() {
		$('#topSection .news').addClass('showed').addClass('hide');
		$('.news_detail').removeClass('show');
		$('.news_detail[data-news="' + $(this).attr('data-news') + '"]').addClass('show');
		return false;
	})
	$('.news_detail a.close').on('click', function() {
		$('#topSection .news').removeClass('hide');
		$(this).closest('.news_detail').removeClass('show');
		return false;
	})


	// mission
	function setMissionPos() {
		var w = $(window);

		var st = w.scrollTop(),
			wh = w.height(),
			wrap = $('#missionSection'),
			ele = $('#missionSection .point');

		var wkt = wrap.offset().top,
			wkh = wrap.height(),
			wkm = wkh + wh;

		var wkp = (st + wh) - wkt;

		ele.css('transform', 'translateY(' + (-(wkp/10) + 50) + 'px)');
	}
	setMissionPos();
	$(window).on('scroll resize', setMissionPos);


	// service
	$('#serviceSection .contents a').on('mouseenter', function() {
		if(!isSpW()) {
			$(this).closest('.contents').find('a').not(this).addClass('hide')
		}
	}).on('mouseleave', function() {
		if(!isSpW()) {
			$(this).closest('.contents').find('a').removeClass('hide')
		}
	}).on('click', function() {
		var my_type = $(this).attr('data-service');
		$('#serviceSection').addClass(my_type);
		return false;
	})
	$('#serviceSection .modal_ele .close').on('click', function() {
		$('#serviceSection').removeClass('app').removeClass('dataplatform');
		return false;
	})


	// recruit
	function setRecruitPos() {
		var w = $(window);

		var st = w.scrollTop(),
			wh = w.height(),
			wrap = $('#recruitSection'),
			ele = $('#recruitSection .ph > *');

		var wkt = wrap.offset().top,
			wkh = wrap.height(),
			wkm = wkh + wh;

		var wkp = (st + wh) - wkt;

		ele.css('transform', 'translateY(' + (-(wkp/10) + 100) + 'px)');
	}
	setRecruitPos();
	$(window).on('scroll resize', setRecruitPos);
	//
	// $('#recruitSection .more a').on('click', function() {
	// 	$('#recruitSection').addClass('detail_show');
	// 	return false;
	// })
	$('#recruitSection .modal_ele .close').on('click', function() {
		$('#recruitSection').removeClass('detail_show');
		return false;
	})



	// company
	$('#companySection .slide').slick({
		infinite: false,
		arrows: false
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('#companySection .tab a').removeClass('current').eq(nextSlide).addClass('current');
	});
	$('#companySection .tab a').on('click', function() {
		$('#companySection .slide').slick('slickGoTo', $('#companySection .tab a').index(this))
		return false;
	});


	// contact
	var _form_sumit = false;
	$('form').on('submit', function() {
		if(_form_sumit) {
			return false;
		}

		_form_sumit = true;
	})
}


/* checkCurrentNav
============================================================================================================ */
function checkCurrentNav() {
	var target = $('[data-target]'),
		back_current;

	var checkPos = function(e) {
		var s = $(this).scrollTop();
		var h = $(this).height();

		var current;

		target.each( function() {
			var mt = $(this).offset().top;
			if(mt < s + h / 2) {
				if($(this).attr('id')) current = $(this).attr('id');
				else current = '';
			} else {
				return false;
			}
		});

		// let src= '../img/'+target+'.jpg;';
		var src= ':../img/me.jpg';

		// $('.site-logo a').css("background","url(./static/img/me.jpg)");
		
		if(back_current != current) {
			$('#header nav ul a').removeClass('current');
			$('#header nav ul a[href="#' + current + '"]').addClass('current');

			$('#' + current + 'Section').addClass('section_show');

			$('body').removeClass();
			$('body').addClass('page-' + current);

			// $('.site-logo a').css("background","url("+ src +")");
		}

		back_current = current;
	}

	$(window).on('scroll resize', checkPos);
	checkPos();

	if(!$('#header nav ul a[href="#top"]').hasClass('current')) {
		$('#header').addClass('def');
	}
}



/* setScroll
============================================================================================================ */
/*! mousewheelStopPropagation.js v1.3.2
 * (c) 2017 - 161 SARL - https://161.io
 * MIT License
 */
!function(a,b,c){"use strict";var d={duration:200,easing:"linear"};a.fn.mousewheelStopPropagation=function(b){function c(a){a.preventDefault(),a.stopPropagation(),"function"==typeof b.wheelstop&&b.wheelstop(a)}function e(a,c){b.emulateNaturalScrolling?a.stop(!0).animate({scrollTop:c},d):a.get(0).scrollTop=c}b=a.extend({wheelstop:null,emulateNaturalScrolling:!0},b);var f=navigator.userAgent.toLowerCase(),g=/(trident|msie)/.test(f),h=document.documentElement,i="mousewheel";return"onmousewheel"in h?i="mousewheel":"onwheel"in h?i="wheel":"DOMMouseScroll"in h&&(i="DOMMouseScroll"),i?this.each(function(){var b=this,d=a(b);d.on(i,function(a){var f=a.originalEvent,h=b.scrollTop,i=b.scrollHeight-d.outerHeight(),j=-f.wheelDelta;isNaN(j)&&(j=f.deltaY);var k=j<0;k&&h<=0||!k&&h>=i?c(a):g&&(k&&-j>h?(e(d,0),c(a)):!k&&j>i-h&&(e(d,i),c(a)))})}):this}}(jQuery,window);

setScroll();
function setScroll() {
	var _isTablet = getDevice() == 'tab';
	var _scroll_flg = false;
	var _page_ids =[];
	var _page_clear_id = 'contact';
	var _scroll_timer;
	var _nav_click_scrollify_flg = false;

	$('[data-target]').each( function() {
		_page_ids.push($(this).attr('id'));
	})

	$('a[href^="#"]').not('a[href="#"]').on('click', function() {
		clearTimeout(_scroll_timer);
		var hash = this.hash;
		$('#header').removeClass('open');

		if(isSpW()) {
			goScroll(hash);
		} else if(_isTablet) {
			goScroll(hash);
		} else {
			if(_scroll_flg || $(document).scrollTop() == $(hash).offset().top) return false;

			$('body').attr('data-contents-name', hash.replace('#', ''));

			_scroll_flg = true;
			$('body,html').animate({scrollTop: $(hash).offset().top}, 1000, 'easeInOutCubic', function(){
				_scroll_flg = false;
			});
		}
		return false;
	})

	if(!isSpW() && !_isTablet) {
		if(location.hash) {
			$('body').attr('data-contents-name', location.hash.replace('#', ''));
		}
		setPageScroll();
	}

	function setPageScroll() {
		$(document).on('mousewheel DOMMouseScroll', function(e){
			clearTimeout(_scroll_timer);
			if(_scroll_flg) return false;

			var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
			if(Math.abs(delta) < 100) {
				if(delta > 0) delta = 100;
				else delta = -100;
			}

			var st = $(this).scrollTop(),
				wh = $(window).height(),
				now_page = $('body').attr('data-contents-name'),
				now_ele = $('#' + now_page),
				rflg = false;

			$.each(_page_ids, function(i) {
				if(now_page == _page_ids[i]) {
					if(delta < 0) {
						if(_page_ids[i+1]) {
							var new_page = $('#' + _page_ids[i+1]);
							if((st + wh + delta) < new_page.offset().top) {
								$('body').attr('data-contents-name', _page_ids[i+1]);
								if($('a[href="#' + _page_ids[i+1] + '"]').length) {
									$('a[href="#' + _page_ids[i+1] + '"]').eq(0).trigger('click');
									rflg = true;
									return false;
								}
							}
						}
					} else {
						if(_page_ids[i-1]) {
							var new_page = $('#' + _page_ids[i-1]);

							if((st - delta) < new_page.offset().top + wh) {
								$('body').attr('data-contents-name', _page_ids[i-1]);
								$('a[href="#' + _page_ids[i-1] + '"]').eq(0).trigger('click');
								rflg = true;
								return false;
							}
						}
					}

					return false;
				}
			})

			if(rflg) {
				return false;
			}
		});
	}
	if(!_isTablet) {
		$(window).on('resize', function() {
			clearTimeout(_scroll_timer);
			if(!isSpW()) {
				if(!$('body').attr('data-contents-name') != _page_clear_id) {
					$('body,html').queue([]).stop().animate({scrollTop: $('#' + $('body').attr('data-contents-name')).offset().top}, 500, 'easeInOutCubic', function() {
						$('body,html').animate({scrollTop: $('#' + $('body').attr('data-contents-name')).offset().top}, 100, 'easeInOutCubic');
					});
				}
			}
		});

		$(window).on('scroll', function() {
			if(!isSpW() && !_scroll_flg) {
				clearTimeout(_scroll_timer);
				_scroll_timer = setTimeout(scrollPosCheck, 300)
			}
		});

		function scrollPosCheck() {
			var st = $(this).scrollTop(),
				wh = $(window).height(),
				now_page = $('body').attr('data-contents-name'),
				n = _page_ids[0],
				rflg = false;
			$.each(_page_ids, function(i) {
				var ele = $('#' + _page_ids[i]);
				if(now_page == _page_ids[i] && ele.offset().top == st) {
					rflg = true;
					return false;
				}

				if(st > ele.offset().top - (wh/2)) {
					n = _page_ids[i];
				}
			})
			if(st > $('#' + _page_clear_id).offset().top - (wh)) {
				n = _page_clear_id;
					rflg = true;
			}
			if(!rflg) {
				$('body').attr('data-contents-name', n);
				if($('a[href="#' + n + '"]').length) {
					$('a[href="#' + n + '"]').eq(0).trigger('click');
					return false;
				}
			}
		}
	}

	/* pageResizeScroll
	============================================================================================================ */
	var _is_sp_flg = isSpW();
	function pageResizeScroll() {
		// resize
		if(_is_sp_flg != isSpW()) {
			_is_sp_flg = isSpW();
			if(_is_sp_flg) {
				$(document).off('mousewheel DOMMouseScroll');
			} else {
				setPageScroll();
			}
		}
	}
	if(!_isTablet) {
		$(window).on('scroll resize', pageResizeScroll).trigger('scroll');
	}

	/* scrollbar
	============================================================================================================ */
	var c = $('.custom_scrollbar_block');

	if(!isSpW()) {
		var scheck = function() {
			c.each(function() {
				var sw = $(this).innerWidth() - $('> *', this).innerWidth();
				if(sw == 0) {
					$(this).addClass('ov_scrollbar');
				} else {
					$(this).css('margin-right', -sw);
				}

				var ch = $(this).innerHeight(),
					ih = $('> *', this).innerHeight();
				if(ch >= ih) {
					$(this).removeClass('show_scrollbar');
				} else {
					$(this).addClass('show_scrollbar');
				}

				checkThumbsPos($(this));
			})
		}

		$(window).on('load', function() {
			c.on('scroll', function(e) {
				checkThumbsPos($(this));
			}).trigger('scroll');
		})

		function checkThumbsPos(ele) {
			var ch =ele.innerHeight(),
				ih = $('> *', ele).innerHeight(),
				sh = parseInt(ch * ch / ih),
				st = ch - sh,
				$sth =ele.next().find('.scrollbar-thumb');
			$sth.css('height', sh);
			var offset = ele.scrollTop() * st / (ih - ch);
			$sth.css('transform', 'translateY(' + offset + 'px)');
		}

		$(window).on('resize', scheck);
		scheck();

		if(!_isTablet) {
			c.on('mouseenter', function() {
				$(document).off('mousewheel DOMMouseScroll');
			}).on('mouseleave', function() {
				setPageScroll();
			})
		}
		c.mousewheelStopPropagation();
	}
}
