window.ShearPhoto = function() {
	this.transform = this.DomMoveEve = this.DomUpEve = this.MoveDivEve = this.zoomEve = this.eveMold = !1, this.DivDownEVe = {}, this.transformFun(), !this.addevent && window.addEventListener ? (this.addevent = "add", this.selectionempty = function() {
		window.getSelection().removeAllRanges()
	}) : (this.addevent = "att", this.selectionempty = function() {
		document.selection.empty()
	}), this.MyAjax = new window.ShearPhoto.MyAjax
}, window.ShearPhoto.prototype = {
	transformFun: function() {
		var c, a = document.body.style,
			b = new Array("MsTransform", "MozTransform", "WebkitTransform", "WebkitTransform", "OTransform", "transform");
		for(c = 0; c < b.length; c++)
			if(b[c] in a) {
				this.transform = b[c];
				break
			}
	},
	HTML5: {
		Reg: new RegExp("translate3d\\((.*?)\\)", "i"),
		HTML5LT: function(a) {
			a ? (this.getLT = function(b) {
				return domstyleTransform = this.Reg.exec(b.style[a]), domstyleTransform ? domstyleTransform[1].split(",", 2) : [0, 0]
			}, this.setLT = function(b, c, d) {
				var e = b.style,
					f = !0,
					g = e[a],
					h = "translate3d(" + c + "," + d + ",0)",
					i = g.replace(this.Reg, function() {
						return f = !1, h
					});
				e[a] = f ? g + " " + h : i
			}, this.setL = function(b, c) {
				var d = b.style,
					e = !0,
					f = d[a],
					g = f.replace(this.Reg, function(a, b) {
						e = !1;
						var d = b.split(",", 2)[1];
						return "translate3d(" + c + "," + d + ",0)"
					});
				d[a] = e ? f + " " + "translate3d(" + c + ",0,0)" : g
			}, this.setT = function(b, c) {
				var d = b.style,
					e = !0,
					f = d[a],
					g = f.replace(this.Reg, function(a, b) {
						e = !1;
						var d = b.split(",", 2)[0];
						return "translate3d(" + d + "," + c + ",0)"
					});
				d[a] = e ? f + " " + "translate3d(0," + c + ",0)" : g
			}) : (this.getLT = function(a) {
				var b = a.style;
				return [b.left || 0, b.top || 0]
			}, this.setLT = function(a, b, c) {
				var d = a.style;
				d.left = b, d.top = c
			}, this.setL = function(a, b) {
				a.style.left = b
			}, this.setT = function(a, b) {
				a.style.top = b
			})
		},
		URL: window.URL || window.webkitURL || window.mozURL || window.msURL || !1,
		canvas: !1,
		Images: !1,
		ImagesType: "image/jpeg",
		HTML5PHP: !1,
		HTML5MAX: !1,
		HandleRotation: function(a, b, c, d, e, f, g, h) {
			var k, l, m, n, p, i = a.ImgOHeight,
				j = a.ImgOWidth,
				q = [Math.ceil(j * f), Math.ceil(i * f)];
			switch(b) {
				case 90:
					k = q[1], l = q[0], m = 0, n = l;
					break;
				case 180:
					k = q[0], l = q[1], m = k, n = l;
					break;
				case 270:
					k = q[1], l = q[0], m = k, n = 0
			}
			d.width = k, d.height = l, e.translate(m, n), e.rotate((360 - b) * Math.PI / 180), e.drawImage(a.arg.ImgMain, 0, 0, j, i, 0, 0, q[0], q[1]), p = e.getImageData(0, 0, k, l), e.clearRect(0, 0, q[0], q[1]), e.fillStyle = "#FFFFFF", e.fillRect(0, 0, q[0], q[1]), d.width = c.IW = g, d.height = c.IH = h, e.putImageData(p, -c.X * f, -c.Y * f), delete p
		},
		zipImg: function(a, b, c, d) {
			var e = new Image,
				f = this;
			e.onload = function() {
				var g, h, i, j, k, l, a = document.createElement("canvas");
				a.style.display = "none", g = document.body, g.appendChild(a), h = a.getContext("2d"), i = this.width, j = this.height, b && (k = i / j, i > b[0] && (i = b[0], j = Math.round(b[0] / k)), j > b[0] && (j = b[0], i = Math.round(b[0] * k), i > b[0] && (i = b[0], j = Math.round(b[0] / k)))), a.width = i, a.height = j, h.fillStyle = "#FFFFFF", h.fillRect(0, 0, i, j), h.drawImage(e, 0, 0, this.width, this.height, 0, 0, i, j), l = a.toDataURL(c, b ? b[1] : .85), f.URL ? (f.BOLBID && f.URL.revokeObjectURL(f.BOLBID), f.BOLBID = f.URL.createObjectURL(f.FormBlob(l)), "function" == typeof d && d(f.BOLBID)) : "function" == typeof d && d(l), h.clearRect(0, 0, i, j), g.removeChild(a), delete l, delete e
			}, e.src = a, delete a
		},
		CtxDrawImage: function(a, b, c, d) {
			var g, h, i, j, k, l, m, n, e = b.R,
				f = d.arg;
			this.HTML5MAX ? (g = b.IW, h = g, i = b.IH, j = g / i, g > this.HTML5MAX ? (g = this.HTML5MAX, i = Math.round(g / j), i > this.HTML5MAX && (i = this.HTML5MAX, g = Math.round(i * j))) : i > this.HTML5MAX && (i = this.HTML5MAX, g = Math.round(i * j), g > this.HTML5MAX && (g = this.HTML5MAX, i = Math.round(g / j))), j = g / h, 0 === e ? (k = d.ImgOWidth - b.X, l = d.ImgOHeight - b.Y, m = k * j, n = l * j, c.width = b.IW = g, c.height = b.IH = i, a.fillStyle = "#FFFFFF", a.fillRect(0, 0, m, n), a.drawImage(f.ImgMain, b.X, b.Y, k, l, 0, 0, m, n)) : this.HandleRotation(d, e, b, c, a, j, g, i)) : 0 === e ? (c.width = b.IW, c.height = b.IH, a.fillStyle = "#FFFFFF", a.fillRect(0, 0, b.IW, b.IH), a.drawImage(f.ImgMain, -b.X, -b.Y)) : this.HandleRotation(d, e, b, c, a, 1, b.IW, b.IH)
		},
		lock: !1,
		PhotoHTML5True: !1,
		SetSrc: function(a, b, c, d) {
			b.src = c.src = a;
			for(var e = 0; e < d[1]; e++) d[0][e].src = a;
			delete a
		},
		BOLBID: !1,
		Aclick: !1,
		artwork: !1,
		EffectsReturn: function() {
			this.Aclick && (this.Aclick.className = ""), this.Aclick = this.artwork, this.artwork && (this.artwork.className = "Aclick")
		},
		Effects: function(a, b) {
			var e, c = this.arg.ImgMain,
				d = this.arg.ImgDom,
				f = this.preview,
				g = this;
			return function() {
				if(!b.lock) {
					if(b.Aclick === this) return g.pointhandle(1500, 1, "亲！现在已经是" + a + "效果了,吃饱饭没事干吗？", 2, "#307ff6", "#fff"), void 0;
					b.lock = !0, e = window.ShearPhoto.psLib(b.Images), b.Aclick && (b.Aclick.className = ""), b.Aclick = this, this.className = "Aclick", g.pointhandle(0, 1, "正在加载" + a + "效果！稍等....，不要动鼠标，可能有点卡", 2, "#fbeb61", "#3a414c", function() {
						setTimeout(function() {
							var i, h = f.domimg;
							i = "原图" === a ? e.save(!1, b.ImagesType) : e.ps(a).save(!1, b.ImagesType), b.URL ? (b.BOLBID && b.URL.revokeObjectURL(b.BOLBID), b.BOLBID = b.URL.createObjectURL(b.FormBlob(i)), b.SetSrc(b.BOLBID, c, d, h), g.runImgUrl = [b.BOLBID, !0, !0]) : (b.SetSrc(i, c, d, h), g.runImgUrl = [i, !0, !0]), delete i, g.pointhandle(1500, 1, a + "效果加载成功！提示：如果机器配置差，效果加载时间会更长哦", 1, "#307ff6", "#fff"), b.lock = !1, b.PhotoHTML5True = !0
						}, 1)
					})
				}
			}
		},
		BlobRegExp: new RegExp("^data:.*base64,"),
		FormBlob: function(a) {
			var b, e, f, g, c = !1,
				d = a.replace(this.BlobRegExp, function() {
					return c = !0, ""
				});
			for(b = c ? atob(d) : unescape(d), e = b.length, f = new Uint8Array(e), g = 0; e > g; g++) f[g] = b.charCodeAt(g);
			return new Blob([f], {
				type: this.ImagesType
			})
		},
		IfHTML5: function(a, b, c) {
			try {
				new Blob(["1"], {
					type: "text/plain"
				})
			} catch(d) {
				b = !1
			}
			a && b && (this.canvas = !0, this.HTML5MAX = c)
		},
		CanvasImg: function(a, b, c) {
			var f, g, h, i, d = document.createElement("canvas"),
				e = document.body;
			if(d.style.display = "none", e.appendChild(d), f = d.getContext("2d"), this.CtxDrawImage(f, a, d, c), g = this.FormBlob(d.toDataURL(this.ImagesType, c.arg.HTML5Quality)), f.clearRect(0, 0, a.IW, a.IH), e.removeChild(d), h = new FormData, h.append("ShearPhotoIW", a.IW), h.append("ShearPhotoIH", a.IH), h.append("ShearPhotoFW", a.FW), h.append("ShearPhotoFH", a.FH), h.append("ShearPhotoP", c.arg.proportional[0]), "[object Object]" === Object.prototype.toString.call(b))
				for(i in b) h.append(i, b[i]);
			return h.append("UpFile", g), h
		}
	},
	_ieexchange_: function() {
		function b(b, c) {
			var d = new Array(a[b], a[c]);
			a[b] = d[1], a[c] = d[0]
		}
		var a = this;
		b("ImgWidth", "ImgHeight")
	},
	SetRote: {
		ROReg: new RegExp("rotate\\((.*?)\\)", "i"),
		SLReg: new RegExp("translate\\((.*?)\\)", "i"),
		run: function(a, b, c, d) {
			var e = a.style,
				f = !0,
				g = e[b],
				h = g.replace(this.ROReg, function() {
					return f = !1, c
				}),
				i = f ? g + " " + c : h,
				f = !0,
				j = i.replace(this.SLReg, function() {
					return f = !1, d
				}),
				i = f ? i + " " + d : j;
			return i
		},
		runSL: function(a, b, c) {
			var d = a.style,
				e = !0,
				f = d[b],
				g = f.replace(this.SLReg, function() {
					return e = !1, c
				});
			return e ? f + " " + c : g
		}
	},
	_exchange_: function() {
		var b, c, a = this;
		return this._ieexchange_(), b = this.rotate, 90 === b || 270 === b ? (c = {
			90: -1,
			270: 1
		}[b], this.ImgRotateFun = function(b, d) {
			var e = c * Math.round(.5 * (d - b)) + "px",
				f = this.arg,
				g = "translate(" + e + "," + e + ")";
			return f.ImgMain.style[a.transform] = a.SetRote.runSL(f.ImgMain, a.transform, g), f.ImgDom.style[a.transform] = a.SetRote.runSL(f.ImgDom, a.transform, g), [d, b]
		}, function(b, d, e) {
			var f = c * Math.round(.5 * (a.ImgWidth - a.ImgHeight)),
				g = "translate(" + f + "px," + f + "px)";
			return b.style[a.transform] = a.SetRote.run(b, a.transform, e, g), d.style[a.transform] = a.SetRote.run(d, a.transform, e, g), f
		}) : (this.preview.WH = [a.ImgWidth, a.ImgHeight], this.ImgRotateFun = function(a, b) {
			return [a, b]
		}, function(b, c, d) {
			return b.style[a.transform] = a.SetRote.run(b, a.transform, d, "translate(0,0)"), c.style[a.transform] = a.SetRote.run(c, a.transform, d, "translate(0,0)"), 0
		})
	},
	preview: {
		isW: new Array,
		isH: new Array,
		run: function(a, b) {
			var d, e, f, g, h, i, j, k, l, m, r, s, t, v, w, x, y, n, o, p, q, u, c = this;
			if("[object Array]" === Object.prototype.toString.call(a.preview) && (d = a.preview.length, e = function() {}, f = a.relativeUrl + "images/default.gif", d > 0)) {
				for(a.scope.parentNode.insertAdjacentHTML("afterEnd", '<div id="preview" style="display:none;margin-left:8px;"></div>'), g = "", h = e, i = !1, a.proportional[0] ? i = a.proportional[0] : h = function(a, b, c, d) {
						a[1][c].style.height = Math.round(b[c] / d[0] * d[1]) + "px"
					}, j = 10, k = 5, l = j + 2 * k, m = 0; d > m; m++) this.domWidth += a.preview[m] + l, g += '<a href="javascript:;" style="width:' + a.preview[m] + "px;height:" + (i ? Math.round(a.preview[m] / i) + "px;" : "auto;") + "margin-right:" + j + "px;background-color: #F5F5F5;border: " + k + "px solid #F5F5F5;" + '"><img src="' + f + '"/></a>';
				this.dom = document.getElementById("preview"), this.dom.innerHTML = g, this.dom.parentNode.style.width = a.scopeWidth + 2 + "px", n = [this.dom.getElementsByTagName("img"), this.dom.getElementsByTagName("a")], o = function(a, b) {
					a.src = b
				}, p = function(a, d, e, f) {
					var j, g = Math.round(d[0] * e),
						h = Math.round(d[1] * e),
						i = !1;
					c.isW[f] === g || (a.style.width = g + "px", c.isW[f] = g, i = !0), c.isH[f] === h || (a.style.height = h + "px", c.isH[f] = h, i = !0), i && b.rotate > 10 && 180 !== b.rotate && (j = (c.isW[f] - c.isH[f]) / (270 === b.rotate ? -2 : 2) + "px", a.style[b.transform] = b.SetRote.runSL(a, b.transform, "translate(" + j + "," + j + ")"))
				}, q = function(a, c, d, e) {
					if(b.transform) {
						var f = d[1] * e + "px";
						a.style[c] = b.SetRote.run(a, c, d[0], "translate(" + f + "," + f + ")")
					} else a.style[c] = d
				}, u = n[0], this.domimg = [n[0], d], this.close_ = function() {
					for(var b = 0; d > b; b++) y = u[b], y.src = f, "cssText" in y.style ? y.style.cssText = "" : y.setAttribute("style", "");
					this.dom.style.display = "none", a.Effects && (a.Effects.style.display = "none"), this.dom.parentNode.style.width = a.scopeWidth + 2 + "px"
				}, this.SetPreview = function(b) {
					if(b) {
						for(var c = 0; d > c; c++) n[1][c].style.height = Math.round(a.preview[c] / b) + "px";
						h = e
					} else h = function(a, b, c, d) {
						a[1][c].style.height = Math.round(b[c] / d[0] * d[1]) + "px"
					}
				}, this.handle = function(b, c, f, g) {
					var i, j, k, l, m, z, A, B, C, D;
					for(c && this.open_(g || a, f), i = b.left, j = b.top, k = b.formAllW, l = b.imgUrl, m = b.TF, z = b.styleR, A = b.R, B = b.formAllH, C = b.HTML3D, r = "boolean" == typeof l ? e : o, s = m ? p : e, t = "boolean" == typeof A ? e : q, "boolean" == typeof i ? i = e : (w = i + a.Border, x = j + a.Border, i = function(a) {
							C.setLT(y, Math.round(w * a) + "px", Math.round(x * a) + "px")
						}), D = 0; d > D; D++) y = u[D], v = a.preview[D] / k, i(v), h(n, a.preview, D, [k, B]), r(y, l), s(y, this.WH, v, D), t(y, z, A, v)
				}
			}
		},
		dom: !1,
		domWidth: 0,
		domimg: !1,
		WH: new Array(2),
		parentNodes: !1,
		SetPreview: function() {},
		EffTrue: !1,
		handle: function(a, b, c) {
			b && this.open_(c)
		},
		close_: function() {
			this.arg.Effects && (this.arg.Effects.style.display = "none"), this.parentNodes && (this.parentNodes.style.width = this.arg.scopeWidth + 2 + "px")
		},
		open_: function(a) {
			var b = 0;
			this.arg = a, this.EffTrue ? (a.Effects.style.display = "block", a.Effects.scrollTop = 0, a.Effects.style.height = a.scopeHeight + "px", this.parentNodes = a.Effects.parentNode, b = a.Effects.offsetWidth) : a.Effects && (a.Effects.parentNode.removeChild(a.Effects), a.Effects = !1), this.dom ? (this.dom.style.display = "block", this.dom.parentNode.style.width = a.scopeWidth + this.domWidth + b + 10 + "px") : a.Effects && (a.Effects.parentNode.style.width = a.scopeWidth + this.domWidth + b + 2 + "px")
		}
	},
	Rotate: function(a) {
		var b, c, d;
		this.saveL = this.formLeft + this.relatL, this.saveT = this.formTop + this.relatT, this.transform ? ("left" === a ? this.rotate -= 90 : this.rotate += 90, this.rotate = {
			"-90": 270,
			0: 0,
			"-270": 90,
			360: 0,
			180: 180,
			90: 90,
			270: 270,
			"-360": 0,
			"-180": 180
		}[this.rotate] || 0, b = "rotate(" + this.rotate + "deg)", c = this._exchange_(), this.setinitial(this.arg, !0), d = c(this.arg.ImgMain, this.arg.ImgDom, b), this.preview.handle({
			left: this.ImgDomL,
			top: this.ImgDomT,
			formAllW: this.formAllW,
			formAllH: this.formAllH,
			imgUrl: !1,
			styleR: this.transform,
			R: [b, d],
			HTML3D: this.HTML5
		})) : ("left" === a ? this.rotate -= 1 : this.rotate += 1, this.rotate = this.rotate > 3 ? 0 : this.rotate < 0 ? 3 : this.rotate, this.ImgRotateFun = 1 === this.rotate || 3 === this.rotate ? function(a, b) {
			return [b, a]
		} : function(a, b) {
			return [a, b]
		}, this.arg.ImgMain.style.filter = this.arg.ImgDom.style.filter = b = "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + this.rotate + ")", this._ieexchange_(), this.preview.handle({
			left: !1,
			top: !1,
			formAllW: this.formAllW,
			formAllH: this.formAllH,
			imgUrl: !1,
			styleR: "filter",
			R: b,
			HTML3D: this.HTML5
		}), this.setinitial(this.arg, !0))
	},
	pointhandle: function(a, b, c, d, e, f, g) {
		function l(b, c, d, e) {
			if(b += e, b > c && e > 0) return k.setT(h, c + "px"), a ? setTimeout(function() {
				l(c, j, d, -1)
			}, a) : "function" == typeof g && g(), void 0;
			if(c > b && 0 > e) try {
				i.arg.scope.removeChild(h)
			} catch(f) {} else k.setT(h, b + "px"), setTimeout(function() {
				l(b, c, d, e)
			}, d)
		}
		var i, j, k, m, h = this.arg.scope.children[0];
		if("point" === h.className && this.arg.scope.removeChild(h), -1 !== a) {
			switch(h = document.createElement("div"), h.className = "point", this.arg.scope.insertBefore(h, this.arg.scope.childNodes[0]), i = this, j = -35, k = this.HTML5, h.style.color = f, h.style.backgroundColor = e, h.innerHTML = "<i></i>" + c, m = h.getElementsByTagName("i")[0], d) {
				case 0:
					m.style.backgroundPosition = "-16px 0";
					break;
				case 1:
					m.style.backgroundPosition = "0 0";
					break;
				case 2:
					m.style.backgroundPosition = "-31px 0"
			}
			l(j, 0, b, 1)
		}
	},
	setinitial: function(a, b) {
		var g, h, i, j, k, l, c = 0,
			d = 0,
			e = !a.traverse,
			f = this.HTML5;
		this.BoxW > this.ImgWidth ? (this.relatW = this.ImgWidth, a.relat.style.width = this.ImgWidth + "px", k = Math.round(.5 * (this.BoxW - this.ImgWidth)), g = (this.relatL = k) + "px", h = -k + "px") : (a.relat.style.width = this.BoxW + "px", this.relatW = this.BoxW, g = h = this.relatL = 0, e && (c = .5 * (this.BoxW - this.ImgWidth))), this.BoxH > this.ImgHeight ? (this.relatH = this.ImgHeight, a.relat.style.height = this.ImgHeight + "px", l = Math.round(.5 * (this.BoxH - this.ImgHeight)), this.relatT = l, i = l + "px", j = -l + "px") : (this.relatH = this.BoxH, a.relat.style.height = this.BoxH + "px", i = j = this.relatT = 0, e && (d = .5 * (this.BoxH - this.ImgHeight))), f.setLT(a.relat, g, i), f.setLT(a.black, h, j), this.AmendOffset(), this.MovePhoto(b, c, d, e)
	},
	MovePhoto: function(a, b, c, d) {
		var h, i, j, k, l, m, o, p, q, r, e = this.arg,
			f = e.ImgDom,
			g = e.ImgMain,
			n = this.HTML5;
		e.traverse && this.BoxW < this.ImgWidth ? (o = this.ImgWidth - this.BoxW, h = this.BoxW - this.formAllW, i = h && o / h, p = Math.round(-this.formLeft * i), j = p, l = p - this.formLeft - this.Border) : (j = b = e.traverse ? 0 : d ? b : this.ImgMainL, l = b - this.formLeft - this.Border), e.traverse && this.BoxH < this.ImgHeight ? (q = this.ImgHeight - this.BoxH, h = this.BoxH - this.formAllH, i = h && q / h, r = Math.round(-this.formTop * i), k = r, m = r - this.formTop - this.Border) : (k = c = e.traverse ? 0 : d ? c : this.ImgMainT, m = c - this.formTop - this.Border), this.ImgMainT = k, this.ImgMainL = j, this.ImgDomL = l, this.ImgDomT = m, n.setLT(g, j + "px", k + "px"), n.setLT(f, l + "px", m + "px"), this.preview.handle({
			left: l,
			top: m,
			formAllW: this.formAllW,
			formAllH: this.formAllH,
			imgUrl: !1,
			TF: a,
			styleR: !1,
			R: !1,
			HTML3D: n
		})
	},
	AmendOffset: function() {
		var b, c, d, e, f, g, a = this.HTML5;
		this.saveL ? (this.formLeft = this.saveL - this.relatL, this.formTop = this.saveT - this.relatT) : (b = a.getLT(this.formParent), "boolean" == typeof this.formLeft && (this.formLeft = parseFloat(b[0])), "boolean" == typeof this.formTop && (this.formTop = parseFloat(b[1])), this.formLeft -= this.relatL, this.formTop -= this.relatT), this.formLeft < 0 && (this.formLeft = 0, this.saveL = this.relatL), this.formTop < 0 && (this.formTop = 0, this.saveT = this.relatT), c = this.formLeft + this.formAllW, d = this.formTop + this.formAllH, c > this.relatW && (e = c - this.relatW, e > this.formLeft ? (this.formW = this.formW - (e - this.formLeft), this.formLeft = 0, this.saveL = this.relatL, this.formAllW = this.formW + this.Mdouble) : (this.formLeft -= e, this.saveL = this.formLeft + this.relatL)), d > this.relatH && (f = d - this.relatH, f > this.formTop ? (this.formH = this.formH - (f - this.formTop), this.formTop = 0, this.saveT = this.relatT, this.formAllH = this.formH + this.Mdouble) : (this.formTop -= f, this.saveT = this.formTop + this.relatT)), a.setLT(this.formParent, this.formLeft + "px", this.formTop + "px"), this.arg.proportional[0] && (g = Math.round(this.formAllW / this.arg.proportional[0]), g > this.formAllH ? (this.formAllW = Math.round(this.formAllH * this.arg.proportional[0]), this.formW = this.formAllW - this.Mdouble) : (this.formAllH = g, this.formH = g - this.Mdouble)), this.arg.form.style.width = this.formW + "px", this.arg.form.style.height = this.formH + "px", this.ie6(this.formParent, this.formAllW, this.formAllH)
	},
	MaxMinLimit: function(a) {
		a.ImgWidth = a.ImgOWidth = this.width, a.ImgHeight = a.ImgOHeight = this.height, "number" == typeof a.arg.Max && (a.ImgWidth > a.arg.Max && (a.ImgWidth = a.arg.Max, a.ImgHeight = Math.round(a.ImgWidth / a.ImgScales)), a.ImgHeight > a.arg.Max && (a.ImgHeight = a.arg.Max, a.ImgWidth = Math.round(a.ImgHeight * a.ImgScales)));
		var b, c;
		a.arg.proportional[0] ? (b = a.Min, c = Math.round(b * a.arg.proportional[0]), c < a.Min && (c = a.Min, b = Math.round(c / a.arg.proportional[0]))) : c = b = a.Min, a.ImgWidth < c && (a.ImgWidth = c, a.ImgHeight = Math.round(a.ImgWidth / a.ImgScales)), a.ImgHeight < b && (a.ImgHeight = b, a.ImgWidth = Math.round(a.ImgHeight * a.ImgScales)), a.artworkW = a.ImgWidth, a.artworkH = a.ImgHeight
	},
	SetProportional: function(a) {
		if(a != this.arg.proportional[0]) {
			if(this.arg.proportional[0] = a, !this.runImgUrl) return;
			var b = this.HTML5.ImagesType,
				c = this,
				d = this.runImgUrl;
			this.preview.close_(), this.pointhandle(0, 1, "正在更换截框比例......", 2, "#fbeb61", "#3a414c", function() {
				c.again(), c.run.apply(c, d), c.HTML5.ImagesType = b, c.preview.SetPreview(a)
			})
		}
	},
	run: function(a, b, c) {
		this.runImgUrl = [a, b, !0], this.HTML5.HTML5PHP = b;
		var d = this,
			e = this.arg,
			f = this.HTML5.canvas && b ? a : e.relativeUrl + a,
			g = new Image;
		c || (this.HTML5.Images = g), this.defaultShear(), this.arg = e, this.HTML5.canvas && b || (this.ImgUrl = a), g.onload = function() {
			var b, c, g;
			return !(this.width = Math.round(this.width)) > 0 || !(this.height = Math.round(this.height)) > 0 ? (d.pointhandle(3e3, 10, "请选择正确图片", 0, "#f82373", "#fff"), void 0) : (e.ImgMain.src = e.ImgDom.src = f, e.black.style.zIndex = 99, d.ImgScales = this.width / this.height, d.Min = e.Min, d.MaxMinLimit.call(this, d), e.ImgMain.style.width = e.ImgDom.style.width = d.artworkW + "px", e.ImgMain.style.height = e.ImgDom.style.height = d.artworkH + "px", d.BoxW = e.scope.offsetWidth - 2, d.BoxH = e.scope.offsetHeight - 2, d.Border = e.Border, d.Mdouble = 2 * e.Border, e.proportional[0] ? (b = e.proportional[1] - d.Mdouble, c = e.proportional[1] / e.proportional[0] - d.Mdouble) : (b = e.proportional[1] - d.Mdouble, c = e.proportional[2] - d.Mdouble), d.formW = b = Math.round(b), d.formH = c = Math.round(c), d.formAllW = b + d.Mdouble, d.formAllH = c + d.Mdouble, d.preview.WH = [d.artworkW, d.artworkH], d.formParent = e.form.offsetParent, d.et(), d.setinitial(e), d.preview.handle({
				left: !1,
				top: !1,
				formAllW: d.formAllW,
				formAllH: d.formAllH,
				TF: !0,
				imgUrl: f,
				styleR: !1,
				R: !1,
				HTML3D: d.HTML5
			}, !0, e), g = d.MoveDiv = new window.ShearPhoto.MoveDiv, g.reckon(e.relat, !1), g.selectionempty = d.selectionempty, g.addevent = d.addevent, g.HTML5 = d.HTML5, g.run({
				to: new Array(e.form),
				form: d.formParent,
				MoveWidth: d.relatW,
				MoveHeight: d.relatH,
				shifting: new Array,
				center: 1,
				centerFront: function() {
					return [d.relatW, d.relatH]
				},
				DivDownFun: function(a) {
					a.arg.MoveWidth = d.relatW, a.arg.MoveHeight = d.relatH, a.DivW = d.formW + d.Mdouble, a.DivH = d.formH + d.Mdouble
				},
				centerfun: function(a, b, c) {
					d.formLeft = a, d.formTop = b, d.MovePhoto(!1, 0, 0), c.arg.MoveWidth = d.relatW, c.arg.MoveHeight = d.relatH, c.DivW = d.formW + d.Mdouble, c.DivH = d.formH + d.Mdouble
				},
				zIndex: 100,
				MoveFun: function(a, b) {
					d.formLeft = a, d.formTop = b, d.MovePhoto(!0, 0, 0)
				}
			}), d.MoveDivEve = function() {
				g.delDownEve()
			}, e.Shearbar.style.display = "block", e.SelectBox.style.visibility = "hidden", d.zoom(), d.pointhandle(2e3, 10, "可以拖动或拉伸蓝边框进行截图", 1, "#fbeb61", "#3a414c"), delete f, delete a, void 0)
		}, g.onerror = function() {
			d.pointhandle(0, 10, "无法读取图片。图片类型或路径不正确 或 relativeUrl参数是否存在问题", 0, "#f82373", "#fff")
		}, this.pointhandle(0, 1, "图片已加载，正在创建截图环境，请稍等........", 2, "#fbeb61", "#3a414c", function() {
			g.src = f
		})
	},
	config: function(a) {
		var b, c, d, f, e, g, h;
		if(this.arg = a, a.Shearbar.style.display = "none", a.scope.style.width = a.black.style.width = a.SelectBox.style.width = a.scopeWidth + "px", a.scope.style.height = a.black.style.height = a.SelectBox.style.height = a.scopeHeight + "px", b = a.scope.parentNode, b.style.width = b.parentNode.style.width = a.scopeWidth + 2 + "px", this.HTML5.IfHTML5(this.transform, a.HTML5, a.HTML5MAX), this.HTML5.HTML5LT(a.translate3d && this.transform), c = this.transform ? function(a, b) {
				a.style.opacity = b
			} : function(a, b) {
				a.style.filter = "alpha(opacity=" + 100 * b + ")"
			}, a.Border > 0) {
			a.DynamicBorder[0].style.display = a.DynamicBorder[1].style.display = a.DynamicBorder[2].style.display = a.DynamicBorder[3].style.display = "none", a.DynamicBorder[0].style.background = a.DynamicBorder[1].style.background = a.DynamicBorder[2].style.background = a.DynamicBorder[3].style.background = "#FFF";
			for(d in a.to) a.to[d].style.border = "1px solid " + a.BorderColor, a.to[d].style.background = a.BorderColor, c(a.to[d], 1);
			a.form.style.border = a.Border + "px" + "  " + a.BorderStyle + "  " + a.BorderColor
		}
		if(a.black.style.background = a.backgroundColor, c(a.black, a.backgroundOpacity), this.preview.run(a, this), a.scope.ondragstart = function() {
				return !1
			}, this.ie6 = navigator.userAgent.indexOf("MSIE 6.0") > 0 && 0 === a.Border ? function(b, c, d) {
				b.style.height = a.DynamicBorder[1].style.height = a.DynamicBorder[2].style.height = d + "px", b.style.width = c + "px"
			} : function() {}, this.preview.EffTrue = a.HTML5Effects && this.HTML5.canvas && a.Effects)
			for(e = a.Effects.getElementsByTagName("a"), g = this.HTML5.Effects, this.HTML5.artwork = this.HTML5.Aclick = e[0], h = 0; h < e.length; h++) f = e[h], f.onclick = g.call(this, f.getAttribute("StrEvent"), this.HTML5);
		this.pointhandle(3e3, 10, "请选择本地照片、相册、拍照，进行截取头像", 2, "#307ff6", "#fff")
	},
	zoom: function() {
		function g(b) {
			b ? (d = a.Min, e = Math.round(d * b), e < a.Min && (e = a.Min, d = Math.round(e / b))) : e = d = a.Min
		}
		var d, e, c, h, i, j, k, a = this,
			b = new window.ShearPhoto.MoveDiv;
		b.reckon(a.arg.ZoomDist, !1), b.selectionempty = a.selectionempty, b.addevent = a.addevent, b.HTML5 = this.HTML5, c = a.arg.ZoomBar, g(a.arg.proportional[0]), b.run({
			to: [c],
			form: c,
			MoveWidth: b.ReckonWH.W,
			MoveHeight: b.ReckonWH.H,
			shifting: new Array,
			center: 1,
			zIndex: 100,
			DivDownFun: function() {
				a.saveL = a.formLeft + a.relatL, a.saveT = a.formTop + a.relatT
			},
			cursor: "pointer",
			MoveFun: function(b) {
				var c, f, g, h;
				c = i > b ? Math.round(k * b + 10) / 100 : Math.round(b * j - 100) / 100, f = Math.round(a.artworkW * c), g = Math.round(a.artworkH * c), e > f && (f = e, g = Math.round(f / a.ImgScales)), d > g && (g = d, f = Math.round(g * a.ImgScales)), h = a.ImgRotateFun(f, g), a.ImgWidth = h[0], a.ImgHeight = h[1], a.arg.ImgMain.style.width = a.arg.ImgDom.style.width = f + "px", a.arg.ImgMain.style.height = a.arg.ImgDom.style.height = g + "px", a.preview.WH = [f, g], a.setinitial(a.arg, !0)
			}
		}), a.zoomEve = function() {
			b.delDownEve()
		}, h = b.ReckonWH.W - b.DivW, i = .5 * h, j = 200 / i, k = 90 / i
	},
	PointerShape: function(a) {
		this.arg.scope.style.cursor = this.arg.form.style.cursor = a
	},
	DelPointerShape: function() {
		this.arg.scope.style.cursor = "", this.arg.form.style.cursor = "move"
	},
	ShearPhotoDown: function(a, b) {
		this.addEvent(a, "mousedown", b), this.addEvent(a, "touchstart", b)
	},
	delShearPhotoDown: function(a, b) {
		this.delEvent(a, "mousedown", b), this.delEvent(a, "touchstart", b)
	},
	et: function() {
		for(var a in this.arg.to) "add" === this.addevent ? ("function" != typeof this.DivDownEVe[a] ? this.DivDownEVe[a] = this.DivDown(a) : this.delShearPhotoDown(this.arg.to[a], this.DivDownEVe[a]), this.ShearPhotoDown(this.arg.to[a], this.DivDownEVe[a])) : this.arg.to[a].onmousedown = this.DivDown(a)
	},
	addEvent: function(a, b, c) {
		var d = {
			add: function() {
				a.addEventListener(b, c, !1)
			},
			att: function() {
				a.attachEvent("on" + b, c)
			}
		};
		d[this.addevent] && d[this.addevent]()
	},
	delEvent: function(a, b, c) {
		var d = {
			add: function() {
				a.removeEventListener(b, c, !1)
			},
			att: function() {
				a.detachEvent("on" + b, c)
			}
		};
		d[this.addevent] && d[this.addevent]()
	},
	DomUp: function(a) {
		var b = this;
		return function() {
			return "function" == typeof b.arg.UpFun && b.arg.UpFun(), a.releaseCapture && a.releaseCapture(), b.DelPointerShape(), "function" == typeof b.DomMoveEve && b.delEvent(document, b.eveMold[1], b.DomMoveEve), "function" == typeof b.DomUpEve && (b.delEvent(document, b.eveMold[2], b.DomUpEve), b.delEvent(window, b.eveMold[2], b.DomUpEve), b.delEvent(window, "blur", b.DomUpEve), b.delEvent(a, "losecapture", b.DomUpEve)), !1
		}
	},
	setWHfalse: function(a, b, c, d, e, f) {
		return b > e && (b = e), c > f && (c = f), b < this.Min && (b = this.Min), c < this.Min && (c = this.Min), [b, c]
	},
	setWfalse: function(a, b, c, d, e) {
		return b > e && (b = e), b < this.Min && (b = this.Min), [b, this.formAllH]
	},
	setHfalse: function(a, b, c, d, e, f) {
		return c > f && (c = f), c < this.Min && (c = this.Min), [this.formAllW, c]
	},
	CycleCalculation: function(a, b, c, d, e) {
		return b > e ? (b = e, a = Math.round(b * c), this.CycleCalculation.apply(this, arguments)) : a > d ? (a = d, b = Math.round(a / c), this.CycleCalculation.apply(this, arguments)) : b < this.Min ? (b = this.Min, a = Math.round(b * c), this.CycleCalculation.apply(this, arguments)) : a < this.Min ? (a = this.Min, b = Math.round(a / c), this.CycleCalculation.apply(this, arguments)) : [a, b]
	},
	setHtrue: function(a, b, c, d, e, f) {
		return b = Math.round(c * d), this.CycleCalculation(b, c, d, e, f)
	},
	setWtrue: function(a, b, c, d, e, f) {
		return c = Math.round(b / d), this.CycleCalculation(b, c, d, e, f)
	},
	amend: function(a, b, c, d, e) {
		var h, i, f = a - this.formAllW,
			g = b - this.formAllH,
			l = this,
			m = this.HTML5,
			n = {
				LL: function() {
					h = Math.round(l.formLeft - f), l.formLeft = h, m.setL(c, h + "px")
				},
				TT: function() {
					i = Math.round(l.formTop - g), l.formTop = i, m.setT(c, i + "px")
				},
				ML: function() {
					f *= .5, h = l.formLeft - f, l.formLeft = h, m.setL(c, h + "px")
				},
				MT: function() {
					g *= .5, i = l.formTop - g, l.formTop = i, m.setT(c, i + "px")
				},
				NO: function() {}
			};
		n[d](), n[e]()
	},
	DomMove: function(a, b, c, d, e, f, g, h, i, j, k) {
		var l, m, n, o, p, q;
		return a.arg.ImgMain, a.arg.ImgDom, "function" == typeof a.DomUpEve && (a.delEvent(document, a.eveMold[2], a.DomUpEve), a.delEvent(window, a.eveMold[2], a.DomUpEve), a.delEvent(window, "blur", a.DomUpEve), a.delEvent(b, "losecapture", a.DomUpEve)), a.DomUpEve = a.DomUp(b), a.addEvent(document, a.eveMold[2], a.DomUpEve), a.addEvent(window, a.eveMold[2], a.DomUpEve), a.addEvent(window, "blur", a.DomUpEve), a.addEvent(b, "losecapture", a.DomUpEve),
			function(b) {
				return b = b || window.event, b.button > 1 ? (a.DomUp(this)(), !1) : (l = a.eveMold[3](b, "clientX"), m = a.eveMold[3](b, "clientY"), q = a.arg.form, setTimeout(function() {
					o = e * (l - c), p = f * (m - d), a.selectionempty(), n = a.drawfun(q, o, p, a.arg.proportional[0], h, i), o = n[0], p = n[1], a.amend(o, p, g, j, k), a.formAllW = o, a.formAllH = p, o = a.formW = o - a.Mdouble, p = a.formH = p - a.Mdouble, q.style.width = o + "px", q.style.height = p + "px", a.ie6(g, o, p), a.MovePhoto(!0, 0, 0)
				}, 1), !1)
			}
	},
	defaultShear: function() {
		this.arg.Shearbar.style.display = "none", "function" == typeof this.MoveDivEve && this.MoveDivEve(), "function" == typeof this.zoomEve && this.zoomEve(), "cssText" in this.arg.ImgMain.style ? this.arg.ImgMain.style.cssText = this.arg.ImgDom.style.cssText = "" : (this.arg.ImgMain.setAttribute("style", ""), this.arg.ImgDom.setAttribute("style", "")), this.arg = this.ImgUrl = this.formW = this.formH = this.formAllW = this.formAllH = this.drawfun = this.formParent = this.ImgWidth = this.ImgHeight = this.artworkW = this.artworkH = this.BoxW = this.BoxH = this.Border = this.Mdouble = this.ImgScales = this.Min = this.formLeft = this.formTop = this.relatL = this.relatT = this.relatW = this.relatH = this.saveL = this.ImgOWidth = this.ImgOHeight = this.saveT = this.HTML5.lock = this.HTML5.PhotoHTML5True = !1, this.rotate = this.ImgMainT = this.ImgDomT = this.ImgMainL = this.ImgDomL = 0, this.preview.isW = [], this.preview.isH = [], this.ImgRotateFun = function(a, b) {
			return [a, b]
		}
	},
	SendUserMsg: function(a, b, c, d, e, f, g, h) {
		this.arg.black.style.zIndex = f ? 199 : 99, this.pointhandle(b, 5, a, c, d, e, h), this.arg.Shearbar.style.display = g ? "none" : "block"
	},
	again: function() {
		this.arg.SelectBox.style.visibility = "visible", this.arg.Shearbar.style.display = "none", this.runImgUrl = !1, this.arg.ImgDom.src = this.arg.ImgMain.src = this.arg.relativeUrl + "images/default.gif"
	},
	CoordinateData: function(a) {
		var d, e, f, g, h, i, j, b = function(a, b, c) {
				return 1 > a && (a = 1, b = Math.round(1 / c)), 1 > b && (b = 1, a = Math.round(c)), [a, b]
			},
			c = {};
		return a || (c.url = "../" + this.ImgUrl), d = {
			1: 270,
			2: 180,
			3: 90,
			90: 270,
			180: 180,
			270: 90
		}[this.rotate] || (d = this.rotate), e = this.ImgWidth, f = this.ImgHeight, g = {
			0: e,
			90: f,
			180: e,
			270: f
		}, h = this.ImgOWidth / g[d], c.R = d, c.X = Math.round((Math.abs(this.ImgDomL) - this.Border) * h), c.Y = Math.round((Math.abs(this.ImgDomT) - this.Border) * h), c.P = this.arg.proportional[0], i = this.formAllW / this.formAllH, j = b(Math.round(this.formAllW * h), Math.round(this.formAllH * h), i), c.IW = j[0], c.IH = j[1], j = b(this.formAllW, this.formAllH, i), c.FW = j[0], c.FH = j[1], c
	},
	SendPHP: function(a) {
		var c, e, b = this,
			d = this.HTML5;
		this.SendUserMsg("正在为你处理截图，稍等...", 0, 2, "#fbeb61", "#3a414c", !0, !0, function() {
			var g, h;
			if((d.HTML5PHP || d.PhotoHTML5True) && d.canvas) try {
				d.BOLBID && d.URL.revokeObjectURL(d.BOLBID), c = b.CoordinateData(!0), e = d.CanvasImg(c, a, b)
			} catch(f) {
				return b.SendUserMsg("错误：切割图片时严重报错,请更换浏览器试试，或者换张图片", 5e3, 0, "#f4102b", "#fff", !1), void 0
			} else {
				if(g = "", "[object Object]" === Object.prototype.toString.call(a))
					for(h in a) g += "&" + h + "=" + a[h];
				c = b.CoordinateData(), e = "JSdate=" + window.ShearPhoto.JsonString.JsonToString(c) + g
			}
			b.MyAjax.carry({
				url: b.arg.url,
				data: e,
				type: "POST",
				timeout: 9e4,
				async: !0,
				lock: !0,
				complete: !1,
				success: function(a) {
					return a = window.ShearPhoto.JsonString.StringToJson(a), a === !1 ? (b.SendUserMsg("错误：请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff", !1), void 0) : a["erro"] ? (b.SendUserMsg("错误：" + a["erro"], 5e3, 0, "#f4102b", "#fff", !1), void 0) : (b.runImgUrl = !1, "function" == typeof b.complete && b.complete(a), delete b.HTML5.Images, void 0)
				},
				error: function() {
					b.SendUserMsg("错误：连接后端失败，可能原因，超时！或者后端环境无法运行", 5e3, 0, "#f4102b", "#fff", !1)
				},
				cache: !1
			})
		})
	},
	DivDown: function(a) {
		var g, h, i, j, k, l, m, b = this,
			c = 1,
			d = 1,
			e = "NO",
			f = "NO";
		return function(n) {
			var q, r, o, p, s, t, u, v, w, x;
			if(n = n || window.event, o = n.button, p = typeof o, n.preventDefault && n.preventDefault(), "number" !== p ? (b.eveMold = ["touchstart", "touchmove", "touchend", function(a, b) {
					return a.touches[0][b]
				}], q = n.touches[0].clientX, r = n.touches[0].clientY) : (b.eveMold = ["mousedown", "mousemove", "mouseup", function(a, b) {
					return a[b]
				}], q = n.clientX, r = n.clientY), 2 > o || "number" !== p) {
				switch(i = b.formAllW, j = b.formAllH, l = b.formParent, k = b.formLeft, m = b.formTop, a) {
					case "BottomRight":
						g = b.relatW - k, h = b.relatH - m, b.drawfun = b.arg.proportional[0] ? b.setHtrue : b.setWHfalse, b.PointerShape("nw-resize");
						break;
					case "TopRight":
						d = -1, f = "TT", g = b.relatW - k, h = m + b.formAllH, b.drawfun = b.arg.proportional[0] ? b.setHtrue : b.setWHfalse, b.PointerShape("ne-resize");
						break;
					case "Bottomleft":
						c = -1, e = "LL", g = k + b.formAllW, h = b.relatH - m, b.drawfun = b.arg.proportional[0] ? b.setHtrue : b.setWHfalse, b.PointerShape("ne-resize");
						break;
					case "Topleft":
						d = c = -1, e = "LL", f = "TT", g = k + b.formAllW, h = m + b.formAllH, b.drawfun = b.arg.proportional[0] ? b.setHtrue : b.setWHfalse, b.PointerShape("nw-resize");
						break;
					case "Topmiddle":
						e = "ML", s = k, t = b.relatW - s - b.formAllW, g = 2 * Math.min(s, t) + b.formAllW, f = "TT", h = m + b.formAllH, d = -1, b.drawfun = b.arg.proportional[0] ? b.setHtrue : b.setHfalse, b.PointerShape("n-resize");
						break;
					case "leftmiddle":
						d = c = -1, g = k + b.formAllW, u = m, v = b.relatH - u - b.formAllH, h = 2 * Math.min(u, v) + b.formAllH, f = "MT", e = "LL", b.drawfun = b.arg.proportional[0] ? b.setWtrue : b.setWfalse, b.PointerShape("e-resize");
						break;
					case "Rightmiddle":
						g = b.relatW - k, u = m, v = b.relatH - u - b.formAllH, h = 2 * Math.min(u, v) + b.formAllH, f = "MT", b.drawfun = b.arg.proportional[0] ? b.setWtrue : b.setWfalse, b.PointerShape("e-resize");
						break;
					case "Bottommiddle":
						s = k, t = b.relatW - s - b.formAllW, g = 2 * Math.min(s, t) + b.formAllW, h = b.relatH - m, b.drawfun = b.arg.proportional[0] ? b.setHtrue : b.setHfalse, e = "ML", b.PointerShape("n-resize")
				}
				w = q - c * i, x = r - d * j, this.setCapture && this.setCapture(), "function" == typeof b.DomMoveEve && b.delEvent(document, b.eveMold[1], b.DomMoveEve), b.DomMoveEve = b.DomMove(b, this, w, x, c, d, l, g, h, e, f), b.addEvent(document, b.eveMold[1], b.DomMoveEve)
			} else b.DomUp(this)();
			return !1
		}
	}
}, window.ShearPhoto.MINGGE = function(a) {
	function b() {
		try {
			var c = function() {
					"complete" === document.readyState && (document.detachEvent("onreadystatechange", c), a())
				},
				d = window.frameElement
		} catch(e) {
			return document.attachEvent("onreadystatechange", c), void 0
		}
		if(null != d) return document.attachEvent("onreadystatechange", c), void 0;
		try {
			document.documentElement.doScroll("left")
		} catch(c) {
			return setTimeout(b, 13), void 0
		}
		a()
	}
	var c;
	"function" == typeof a && (document.addEventListener ? (c = function() {
		document.removeEventListener("DOMContentLoaded", c, !1), a()
	}, document.addEventListener("DOMContentLoaded", c, !1)) : b())
}, window.ShearPhoto.MoveDiv = function() {
	this.arg = new Array, this.ReckonWH = this.DivW = this.DivH = this.selectionempty = this.addevent = this.DivDownEVe = this.DomMoveEve = this.DomUpEve = this.eveMold = !1
}, window.ShearPhoto.MoveDiv.prototype = {
	ZeroSetting: function() {
		var h, a = this.HTML5.getLT(this.arg.form),
			b = parseFloat(a[0]),
			c = parseFloat(a[1]),
			d = this._size_(window, !0),
			e = function() {},
			f = function() {},
			g = !1;
		isNaN(b) || (g = !0, this.HTML5.setL(this.arg.form, 0), e = function(a, c) {
			0 > a && (a = 0), this_.HTML5.setL(c, b - a + "px")
		}), isNaN(c) || (g = !0, this.HTML5.setT(this.arg.form, 0), f = function(a, b) {
			0 > a && (a = 0), this_.HTML5.setT(b, c - a + "px")
		}), g === !0 && (h = this._size_(window, !0), e(d.W - h.W, this.arg.form), f(d.H - h.H, this.arg.form))
	},
	reckon: function(a, b) {
		var c, d;
		this._size_(a), c = this, b === !0 && (d = function() {
			c.ZeroSetting(), c._size_(a), c.arg.MoveWidth = c.ReckonWH.W, c.arg.MoveHeight = c.ReckonWH.H, c.SetCenter(c.arg)
		}, this.addEvent(window, "resize", d))
	},
	_size_: function(a, b) {
		var c, d, e, f;
		return a === window ? (f = {
			add: document.documentElement,
			att: document.body
		}[this.addevent], c = f.clientWidth, d = f.clientHeight, e = {
			W: Math.max(f.scrollWidth, c),
			H: Math.max(f.scrollHeight, d),
			CW: c,
			CH: d
		}) : (c = a.offsetWidth, d = a.offsetHeight, e = {
			W: c,
			H: d,
			CW: c,
			CH: d
		}), b === !0 ? e : (this.ReckonWH = e, void 0)
	},
	DomUp: function(a) {
		var b = this;
		return function() {
			return a.releaseCapture && a.releaseCapture(), "function" == typeof b.DomMoveEve && b.delEvent(document, b.eveMold[1], b.DomMoveEve), "function" == typeof b.DomUpEve && (b.delEvent(document, b.eveMold[2], b.DomUpEve), b.delEvent(window, b.eveMold[2], b.DomUpEve), b.delEvent(window, "blur", b.DomUpEve), b.delEvent(a, "losecapture", b.DomUpEve)), !1
		}
	},
	DivWHFun: function() {
		this.DivW = this.arg.form.offsetWidth, this.DivH = this.arg.form.offsetHeight
	},
	DomMove: function(a, b, c, d) {
		var j, q, r, s, t, o, p, g = a.arg.form,
			h = a.DivW,
			i = a.DivH,
			k = function() {},
			l = a.arg.shifting = "[object Array]" === Object.prototype.toString.call(a.arg.shifting) && a.arg.shifting.length > 1 ? a.arg.shifting : new Array(0, 0),
			m = a.arg.MoveWidth - l[0],
			n = a.arg.MoveHeight - l[1];
		return "function" == typeof a.DomUpEve && (a.delEvent(document, a.eveMold[2], a.DomUpEve), a.delEvent(window, a.eveMold[2], a.DomUpEve), a.delEvent(window, "blur", a.DomUpEve), a.delEvent(b, "losecapture", a.DomUpEve)), a.DomUpEve = a.DomUp(b), a.addEvent(document, a.eveMold[2], a.DomUpEve), a.addEvent(window, a.eveMold[2], a.DomUpEve), a.addEvent(window, "blur", a.DomUpEve), a.addEvent(b, "losecapture", a.DomUpEve), o = m - h, p = n - i, "function" == typeof a.arg.MoveFun && (k = a.arg.MoveFun), j = [o, p],
			function(b) {
				return b = b || window.event, b.button > 1 ? (a.DomUp(this)(), !1) : (s = a.eveMold[3](b, "clientX"), t = a.eveMold[3](b, "clientY"), setTimeout(function() {
					q = s - c, r = t - d, a.selectionempty(), q = q < -l[0] ? -l[0] : q, q = q > o ? o : q, r = r < -l[1] ? -l[1] : r, r = r > p ? p : r, a.HTML5.setLT(g, q + "px", r + "px"), k(q, r, j)
				}, 1), !1)
			}
	},
	DivDown: function() {
		var a = this;
		return function(b) {
			var e, f, c, d, g, h, i, j, k;
			return b = b || window.event, c = b.button, d = typeof c, b.preventDefault && b.preventDefault(), "number" !== d ? (a.eveMold = ["touchstart", "touchmove", "touchend", function(a, b) {
				return a.touches[0][b]
			}], e = b.touches[0].clientX, f = b.touches[0].clientY) : (a.eveMold = ["mousedown", "mousemove", "mouseup", function(a, b) {
				return a[b]
			}], e = b.clientX, f = b.clientY), 2 > c || "number" !== d ? (g = a.HTML5.getLT(a.arg.form), h = parseFloat(g[0]), i = parseFloat(g[1]), j = e - h, k = f - i, this.setCapture && this.setCapture(), "function" == typeof a.arg.DivDownFun && a.arg.DivDownFun(a), "function" == typeof a.DomMoveEve && a.delEvent(document, a.eveMold[1], a.DomMoveEve), a.DomMoveEve = a.DomMove(a, this, j, k, h, i), a.addEvent(document, a.eveMold[1], a.DomMoveEve)) : a.DomUp(this)(), !1
		}
	},
	ShearPhotoDown: function(a, b) {
		this.addEvent(a, "mousedown", b), this.addEvent(a, "touchstart", b)
	},
	delShearPhotoDown: function(a, b) {
		this.delEvent(a, "mousedown", b), this.delEvent(a, "touchstart", b)
	},
	et: function() {
		var c, a = this,
			b = this.arg.cursor || "move";
		for(a = this, c = 0; c < this.arg.to.length; c++) "add" === this.addevent ? ("function" != typeof this.DivDownEVe ? this.DivDownEVe = this.DivDown() : this.delShearPhotoDown(this.arg.to[c], this.DivDownEVe), this.ShearPhotoDown(this.arg.to[c], this.DivDownEVe)) : this.arg.to[c].onmousedown = this.DivDown(), this.arg.to[c].style["cursor"] = b
	},
	delDownEve: function() {
		for(var a = 0; a < this.arg.to.length; a++) "add" === this.addevent && "function" == typeof this.DivDownEVe && this.delShearPhotoDown(this.arg.to[a], this.DivDownEVe)
	},
	setdiv: function(a, b, c, d) {
		var e, f, g;
		"function" == typeof d.centerFront && (e = d.centerFront(), b = e[0], c = e[1]), f = Math.round(.5 * (c - this.DivH)), f = 0 > f ? 0 : f, g = Math.round(.5 * (b - this.DivW)), g = 0 > g ? 0 : g, this.HTML5.setLT(a, g + "px", f + "px"), "function" == typeof d.centerfun && d.centerfun(g, f, this)
	},
	addEvent: function(a, b, c) {
		var d = {
			add: function() {
				a.addEventListener(b, c, !1)
			},
			att: function() {
				a.attachEvent("on" + b, c)
			}
		};
		d[this.addevent] && d[this.addevent]()
	},
	delEvent: function(a, b, c) {
		var d = {
			add: function() {
				a.removeEventListener(b, c, !1)
			},
			att: function() {
				a.detachEvent("on" + b, c)
			}
		};
		d[this.addevent] && d[this.addevent]()
	},
	SetCenter: function(a) {
		var b, c, d;
		a.center && (1 === a.center ? (b = this.ReckonWH.CW, c = this.ReckonWH.CH) : (d = this._size_(a.center, !0), b = d.CW, c = d.CH), this.setdiv(a.form, b, c, a))
	},
	run: function(a) {
		this.arg = a, this.DivW = a.form.offsetWidth, this.DivH = a.form.offsetHeight, this.SetCenter(a), "number" == typeof a.zIndex && (a.form.style.zIndex = a.zIndex), this.et()
	}
}, window.ShearPhoto.JsonString = {
	_json_: null,
	JsonToString: function(a) {
		try {
			this._json_ = new Array, this._read_(a, !0);
			var b = this._json_.join("");
			return b = b.replace(/,([\}\]])/g, function(a, b) {
				return b
			}), this._json_ = null, b
		} catch(c) {
			return alert("发生错误，错误代码--" + c), ""
		}
	},
	StringToJson: function(a) {
		var b, c;
		if("string" != typeof a) return alert("请传入JSON字串符,看清楚demo.html是怎么操作的"), void 0;
		try {
			return b = new Function("return (" + a + ")")(), c = this._type_(b), "[object Object]" !== c && "[object Array]" !== c ? (alert("严重报错：后端没返回到JSON，而是一串无效字符串。\n\n你是在调试吗？\n\n那么按确定，查看那串无效字符串吧"), alert(a), !1) : b
		} catch(d) {
			return alert("严重报错：后端没返回到JSON，而是一串无效字符串。\n\n你是在调试吗？\n\n那么按确定，查看那串无效字符串吧"), alert(a), !1
		}
	},
	_type_: function(a) {
		if("number" == typeof a.nodeType) return "[object document]";
		var b = Object.prototype.toString.call(a);
		return b
	},
	_addjson_: function(a, b, c) {
		var e = {
			"[object Object]": b,
			"[object Array]": c
		};
		this._json_.push(e[a])
	},
	_addstring_: function(a) {
		var c, b = typeof a;
		return "string" === b ? '"' + a + '"' : "number" === b ? a : (c = this._type_(a), "[object Object]" === c || "[object Array]" === c ? !1 : '""')
	},
	_read_: function(a, b) {
		var d, e, c = this._type_(a);
		if(b && "[object Object]" !== c && "[object Array]" !== c) return alert("你传入不是数组或JSON,看清楚demo.html是怎么操作的"), this._json_ = null, !1;
		this._addjson_(c, "{", "[", b);
		for(d in a) "undefined" == typeof a.constructor.prototype[d] && (e = this._addstring_(a[d]), "boolean" != typeof e ? this._addjson_(c, '"' + d + '":' + e + ",", e + ",") : (this._addjson_(c, '"' + d + '":', ""), this._read_(a[d], !1)));
		b = b ? "" : ",", this._addjson_(c, "}" + b, "]" + b)
	}
}, window.ShearPhoto.MyAjax = function() {
	this.serverdata = this.erromsg = this.timeout = this.stop = this.xmlhttp = !1, this.transit = !0
}, window.ShearPhoto.MyAjax.prototype.handle = function(a, b) {
	if(4 == a.readyState) {
		if(this.stop === !0) return;
		if(this.transit = !0, b.timeout && b.async && (clearTimeout(this.timeout), this.timeout = !1), 200 == a.status) {
			var c = this.serverdata = a.responseText.replace(/(^\s*)|(\s*$)/g, "");
			"function" == typeof b.success && b.success(c)
		} else this.erromsg = a.status, "function" == typeof b.error && b.error(a.status)
	} else if(0 == a.readyState) {
		if(this.stop === !0) return;
		b.timeout && b.async && (clearTimeout(this.timeout), this.timeout = !1), this.erromsg = a.readyState, this.transit = !0, "function" == typeof b.error && b.error(a.readyState)
	}
}, window.ShearPhoto.MyAjax.prototype.out = function(a) {
	this.transit = !0, this.erromsg = 504, this.stop = !0, "function" == typeof a.error && a.error(504)
}, window.ShearPhoto.MyAjax.prototype.carry = function(a) {
	var b, c, d, e;
	if(a.lock && !this.transit) return !1;
	this.transit = !1, this.stop = this.erromsg = !1, b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), a.type = a.type.toUpperCase(), c = function() {}, "string" == typeof a.data ? (a.data = a.data.replace(/(^\s*)|(\s*$)/g, ""), c = function() {
		b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	}) : "[object FormData]" !== Object.prototype.toString.call(a.data) ? (a.data = "", c = function() {
		b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	}) : ("function" == typeof a.progress && b.upload.addEventListener("progress", a.progress, !1), a.type = "POST"), d = "" == a.data ? [null, ""] : [a.data, "?" + a.data], e = this, "function" == typeof a.complete && a.complete(), a.timeout && a.async && (this.timeout = setTimeout(function() {
		e.out(a)
	}, a.timeout)), a.async === !0 && (b.onreadystatechange = function() {
		e.handle(b, a)
	});
	try {
		switch(a.type) {
			case "POST":
				b.open("POST", a.url, a.async), c();
				break;
			default:
				b.open("GET", a.url + d[1], a.async), a.cache === !0 || b.setRequestHeader("If-Modified-Since", "0")
		}
	} catch(f) {
		return this.erromsg = 505, a.timeout && a.async && (clearTimeout(this.timeout), this.timeout = !1), this.transit = !0, "function" == typeof a.error && a.error(505), void 0
	}
	b.send(d[0]), a.async === !1 && e.handle(b, a)
}, window.ShearPhoto.frameUpImg = function(a) {
	this.BodyDom = document.body, this.FORM = a.FORM, this.upfile = this.FORM.UpFile, this.config = a, this.upfileclick = !1, "function" != typeof a.erro && (a.erro = function() {}), this.FORM.action = a["url"];
	var b = this;
	this.parentNodes = this.upfile.parentNode, window.attachEvent && (this.parentNodes.onmousemove = function() {
		var a = window.event.offsetX + 5;
		0 > a && (a = 0), a > 224 && (a = 224), b.upfile.style.width = a + "px"
	})
}, window.ShearPhoto.frameUpImg.prototype = {
	createframe: function() {
		this.BodyDom.insertAdjacentHTML("afterBegin", '<iframe name="POSTiframe"   class="displayNone"  ></iframe>'), this.iframe = document.getElementsByName("POSTiframe")[0], this.createEve(this.iframe, window.frames["POSTiframe"])
	},
	createEve: function(a, b) {
		var c = this;
		this.upfile.files ? a.onload = function() {
			var d, e;
			a.onload = null, d = b.document.getElementsByTagName("BODY")[0], e = d.innerHTML, c.Evebubbling(e)
		} : a.onreadystatechange = function() {
			var d, e;
			"complete" === a.readyState && (a.onreadystatechange = null, d = b.document.getElementsByTagName("BODY")[0], e = d.innerHTML, c.Evebubbling(e))
		}
	},
	delframe: function() {
		this.BodyDom.removeChild(this.iframe), this.DelCreateUpfile()
	},
	Evebubbling: function(a) {
		"" != a && (this.upfile.onclick = this.upfileclick, "function" == typeof this.fun && this.fun(a), this.delframe())
	},
	inArray: function(a, b) {
		if(b.indexOf) return b.indexOf(a);
		for(var c = 0, d = b.length; d > c; c++)
			if(b[c] === a) return c;
		return -1
	},
	DelCreateUpfile: function() {
		var b, a = this.upfile.onchange;
		this.upfile.onchange = this.upfile.onclick = null, this.parentNodes.removeChild(this.upfile), b = document.createElement("input"), b.setAttribute("type", "file"), b.setAttribute("name", "UpFile"), this.parentNodes.appendChild(b), this.upfile = b, this.upfile.onchange = a, this.upfile.onclick = this.upfileclick
	},
	Upsubmit: function(a) {
		var b, d, c, e;
		try {
			if(b = a.value.split("."), b = "[object Array]" === Object.prototype.toString.call(b) ? b[b.length - 1] : "", -1 == this.inArray(b.toLowerCase(), this.config.UpType)) return this.DelCreateUpfile(), this.config.erro("请选择正确图片类型"), void 0;
			if(c = a.files) {
				if(c = c[0], c.type && (d = "image/gif" === c.type ? "image/jpeg" : c.type, this.config.HTML5.ImagesType = d), c.size <= 0) return this.DelCreateUpfile(), this.config.erro("错误：不能选择空字节文件"), void 0;
				if(this.config.HTML5.canvas) {
					if(c.size > 1024 * 1024 * this.config.HTML5FilesSize) return this.DelCreateUpfile(), this.config.erro("错误：HTML5上传不能大于" + this.config.HTML5FilesSize + "M"), void 0
				} else if(c.size > 1024 * 1024 * this.config.FilesSize) return this.DelCreateUpfile(), this.config.erro("错误：文件不能大于" + this.config.FilesSize + "M"), void 0
			}
			e = this, "function" == typeof this.config.preced && this.config.preced(function() {
				if(e.config.HTML5.canvas) {
					var a = new FileReader;
					return a.onload = function() {
						e.DelCreateUpfile(), e.config.HTML5.zipImg(this.result, e.config.HTML5ZIP, d, function(b) {
							"function" == typeof e.fun && e.fun({
								success: b
							}, !0), delete a
						})
					}, a.readAsDataURL(c), void 0
				}
				e.createframe(), e.FORM.submit()
			})
		} catch(f) {
			return this.DelCreateUpfile(), this.config.erro("你选择了非图片类型，或 图片路径有误"), void 0
		}
	},
	run: function(a) {
		var b = this;
		this.fun = a, this.upfile.onclick = this.upfileclick = function() {
			"function" == typeof b.config.fileClick && b.config.fileClick()
		}, this.upfile.onchange = function() {
			return "" == this.value ? !1 : (this.onclick = function() {
				return !1
			}, b.Upsubmit(this), void 0)
		}
	}
};