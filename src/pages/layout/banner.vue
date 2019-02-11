<template>
	<div class="banner-banner" :class="{'fold-banner': isFold}">
		<div v-for="(item,index) in data" :key="index" class="nav-list" :class="'nav' + index">
			<span class="nav-list-first" :class="{active: item[props.isActive]}" @click="expandNav($event, item, index)">
				<i class="nav-list-icon iconfont" :class="item[props.icon]"></i>
				<span class="nav-list-text">{{item[props.text]}}</span>
				<span class="nav-list-caret icon-jiantou iconfont"></span>
			</span>
			<div class="nav-list-second">
				<div
					v-for="(item2, index) in item[props.children]"
					:key="index" class="nav-list-second__item"
					:class="{active: item2.isActive}"
					@click="selectSecondNav(item2)">
					<router-link :to="item2[props.url]">{{item2[props.text]}}</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		created() {
			this.currentRouter = this.$route.path;
			this.$nextTick(() => {
				this.initExpandNav();
			});
		},
		computed: {
			isFold() {
				return this.$store.state.isFold;
			}
		},
		watch: {
			"$route": function(to, old) {
				if (old.path === "/home") { 
					this.$root.ignoreFirstRenderExpand = true; 
					return
				}else {
					this.$root.ignoreFirstRenderExpand = true; 
				}
				this.initExpandNav();
			},
		},
		props: {
			data: {
				type: Array,
				default: [],
			},
			props: {
				type: Object,
				default() {
					return {
						icon: "icon",
						text: "text",
						url: "url",
						children: "children"						
					}
				}
			}
		},
		data() {
			return {
				active: false,
			};
		},
		methods: {
			//==========================展开导航栏==========================================//
			expandNav(e, item) {
				let nav = e.nodeType ? e : e.currentTarget.parentNode;
				let navHeight = parseInt(window.getComputedStyle(nav)["height"]);
				let secondNav = nav.querySelector(".nav-list-second");
				let secondNavHeight = parseInt(window.getComputedStyle(secondNav)["height"]);
				if (item.isActive) {
					nav.style = "";
					item.isActive = false;
				}else {
					Array.from(document.querySelector(`.banner-banner`).children).forEach(banner => {
						banner.style = "";
					})
					this.data.forEach(first => {
						first.isActive = false;
					});
					nav.style.height = navHeight + secondNavHeight + "px";
					item.isActive = true;
				}
			},
			//==========================选择二级分类==========================================//
			selectSecondNav(item2) {
				this.data.forEach(first => {
					first[this.props.children].forEach(second => {
						second.isActive = false;
					});
				});
				item2.isActive = true;
			},
			//===================当浏览器刷新以后，展开路由对应的banner=============================//
			initExpandNav() {
				const firstRoute = this.$route.path.match(/\/\w+/)[0];//一级路由
				const secondRoute = this.$route.path.match(/\/\w+/).input;//二级路由
				let currentBanner = null;//当前应该展开的banner
				if (firstRoute === "/home") {return;}
				this.data.forEach((first,index) => {
					first[this.props.children].forEach(second => {
						if (second[this.props.url] === firstRoute) {
							this.$nextTick(() => {
								 if (!this.$root.ignoreFirstRenderExpand) {
									this.expandNav(document.querySelector(`.nav-list.nav${index}`), first);
									this.selectSecondNav(second);
								 	this.$root.ignoreFirstRenderExpand = true;
								}else {
									
								}
								this.selectSecondNav(second);
							});
						}
					});
				});
			},

		}
	}
</script>

<style  lang="scss">
	.banner-banner {
        width: $banner-width;
        height: 100%;
		background: $banner-background-color;
		color: $white;
		transition: width .3s;
		&.fold-banner {
			width: $banner-width/4;
			.nav-list-second {
				display: none;
			}
			.nav-list-icon {
				left: calc(50% - .5em) !important;
			}
			.nav-list-caret {
				display: none;
			}
			.nav-list-text {
				display: none;
			}
		}	
	}

	.nav-list {
		height: $banner-list-height;
		line-height: $banner-list-height;
		overflow: hidden;
		cursor: pointer;
		transition: $banner-expand-transition;
		.nav-list-first {
			width: 100%;
			height: $banner-list-height;
			display: inline-block;
			border-bottom: $banner-list-border-bottom;
			transition: background .2s;
			position: relative;
			&.active {
				color: $banner-background-hover-font-color;
				.nav-list-caret {
					transform: rotate(180deg);
				}
			}
			&:hover {
				color: $banner-background-hover-font-color;
			}
			.nav-list-icon {
				margin-left: 1em;
			}
			.nav-list-text {
				padding-left: 1em;
			}
			.nav-list-caret {
				color: inherit;
				font-size: 12px;
				line-height: 1;
				transition: transform .2s;
				transform: rotate(90deg);
				position: absolute;
				top: 50%;
				right: 1em;
				margin-top: -6px;
			}
			
		}
		.nav-list-second {
			background: $banner-background-hover-color;
			width: 100%;
			overflow: hidden;
			.nav-list-second__item {
				text-align: center;
				a {
					display: inline-block;
					width: 100%;
					height: 100%;
				}
				&.active {
					color: $banner-list-font-active-color;
				}
			}
		}
	}
	// 动画
	.slow-expand-enter-active, .slow-expand-leave-active {
		transition: height 2s;
	}
	.slow-expand-enter {
		height: 0;
	}


</style>
