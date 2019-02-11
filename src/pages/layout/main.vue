<template>
    <div class="main-wrap">
		<header class="layout-header">
			<s-header></s-header>
		</header>
		<section class="layout-body">
			<aside class="banner">
				<s-banner :props="bannerProps" :data="bannerData"></s-banner>
			</aside>
			<main class="content">
				<s-tabs></s-tabs>
				<s-content></s-content>
			</main>
		</section>
    </div>
</template>

<script>
	import header from "@/pages/layout/header.vue"
	import content from "@/pages/layout/content.vue"
	import banner from "@/pages/layout/banner.vue"
	import tabs from "@/pages/layout/tabs.vue"
	export default {
        mounted(){

		},
		components: {
			"s-header": header,
			"s-content": content,
			"s-banner": banner,
			"s-tabs": tabs,
		},
		data() {
			return {
				bannerData: [{
					icon2: "icon-shangcheng",
					text2: "商品管理",
					url2: "",
					isActive: false,
					children2: [{
						icon2: "",
						text2: "商品管理",
						url2: "/a",
						isActive: false,
					},{
						icon2: "",
						text2: "商品分类",
						url2: "/b",
						isActive: false,
					}]
				}],
				bannerProps: {
					icon: "icon2",
					text: "text2",
					url: "url2",
					children: "children2"
				},
			}
		}
	}
</script>

<style lang='scss' >
	.main-wrap {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 1600px;
		overflow-x: hidden;
	}
	.layout-header {
		flex: 0 0 auto;
	}
	.layout-body {
		flex: 1;
		display: flex;
		>.banner {
			flex: 0 0 auto;
		}
		>.content {
			overflow: hidden;
			flex: 1;
       		background: #f0f3fa;
		}
	}
</style>
