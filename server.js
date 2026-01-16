// 展会信息服务
const server = Bun.serve({
  port: 3000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  },
  async fetch(req) {
    const url = new URL(req.url);
    
    // 处理 CORS 预检请求
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    
    // 展会信息 API
    if (url.pathname === "/api/exhibitions" && req.method === "GET") {
      const exhibitions = [
        {
          id: 1,
          title: "第138届中国进出口商品交易会（广交会）",
          date: "2025年10月15日 - 11月4日",
          location: "广州 · 广交会展馆",
          description: "广交会是中国最大的进出口商品交易会，每届吸引来自全球200多个国家和地区的采购商参会。本届展会展览面积达155万平方米，展位总数7.46万个，参展企业超3.2万家。",
          tags: ["电子家电", "机械设备", "纺织品", "家居用品"],
          badge: "热门",
          badgeColor: "#e63946",
          linkColor: "#e63946",
          detailLink: "#"
        },
        {
          id: 2,
          title: "2025中国义乌国际小商品（秋季）博览会",
          date: "2025年10月21日 - 25日",
          location: "义乌 · 义乌国际博览中心",
          description: "义博会是全球最大的小商品专业展会，展示包括日用品、工艺品、礼品、家居用品等数万种商品，是非洲采购商寻找优质供应商的理想平台。",
          tags: ["日用品", "工艺品", "礼品", "家居用品"],
          badge: "推荐",
          badgeColor: "#457b9d",
          linkColor: "#457b9d",
          detailLink: "#"
        },
        {
          id: 3,
          title: "2025广州国际礼品及家居用品展",
          date: "2025年8月22日 - 24日",
          location: "广州 · 广交会展馆",
          description: "广州国际礼品及家居用品展是华南地区最大的礼品和家居用品展会，展示最新的礼品、装饰品、家居用品等产品。",
          tags: ["礼品", "家居用品", "装饰品"],
          badge: null,
          badgeColor: null,
          linkColor: "#1a365d",
          detailLink: "#"
        },
        {
          id: 4,
          title: "汇展雅昌·2025第二十一届全国仿真植物花卉、婚庆道具&美陈道具(春季)交易会",
          date: "2025年2月20日 - 22日",
          location: "义乌 · 义乌国际博览中心",
          description: "全国仿真植物花卉、婚庆道具&美陈道具交易会是行业内专业的展会，展示仿真植物、花卉、婚庆道具和美陈道具等产品。",
          tags: ["仿真植物", "婚庆道具", "美陈道具"],
          badge: null,
          badgeColor: null,
          linkColor: "#1a365d",
          detailLink: "#"
        }
      ];
      
      return new Response(JSON.stringify(exhibitions), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // 静态文件服务
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const file = Bun.file("./index.html");
      return new Response(file, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    }
    
    if (url.pathname.endsWith(".js")) {
      const file = Bun.file("." + url.pathname);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            "Content-Type": "application/javascript"
          }
        });
      }
    }
    
    if (url.pathname.endsWith(".css")) {
      const file = Bun.file("." + url.pathname);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            "Content-Type": "text/css"
          }
        });
      }
    }
    
    return new Response("Not Found", { status: 404 });
  }
});

console.log(`🚀 服务器运行在 http://localhost:${server.port}`);
