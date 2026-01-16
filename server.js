// 展会信息服务
const DATA_FILE = "./data/exhibitions.json";

// 读取展会数据
async function readExhibitions() {
  try {
    const file = Bun.file(DATA_FILE);
    if (await file.exists()) {
      const content = await file.text();
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("读取数据文件失败:", error);
  }
  return [];
}

// 保存展会数据
async function saveExhibitions(exhibitions) {
  try {
    await Bun.write(DATA_FILE, JSON.stringify(exhibitions, null, 2));
    return true;
  } catch (error) {
    console.error("保存数据文件失败:", error);
    return false;
  }
}

const server = Bun.serve({
  port: 3000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    
    // 获取所有展会信息
    if (url.pathname === "/api/exhibitions" && req.method === "GET") {
      const exhibitions = await readExhibitions();
      return new Response(JSON.stringify(exhibitions), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // 获取单个展会信息
    if (url.pathname.startsWith("/api/exhibitions/") && req.method === "GET") {
      const id = parseInt(url.pathname.split("/").pop());
      const exhibitions = await readExhibitions();
      const exhibition = exhibitions.find(e => e.id === id);
      
      if (!exhibition) {
        return new Response(JSON.stringify({ error: "展会不存在" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      
      return new Response(JSON.stringify(exhibition), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // 创建新展会
    if (url.pathname === "/api/exhibitions" && req.method === "POST") {
      try {
        const body = await req.json();
        const exhibitions = await readExhibitions();
        
        // 生成新ID
        const newId = exhibitions.length > 0 
          ? Math.max(...exhibitions.map(e => e.id)) + 1 
          : 1;
        
        const newExhibition = {
          id: newId,
          title: body.title || "",
          date: body.date || "",
          location: body.location || "",
          description: body.description || "",
          tags: body.tags || [],
          badge: body.badge || null,
          badgeColor: body.badgeColor || null,
          linkColor: body.linkColor || "#1a365d",
          detailLink: body.detailLink || "#"
        };
        
        exhibitions.push(newExhibition);
        const saved = await saveExhibitions(exhibitions);
        
        if (saved) {
          return new Response(JSON.stringify(newExhibition), {
            status: 201,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        } else {
          return new Response(JSON.stringify({ error: "保存失败" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ error: "请求格式错误" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }
    
    // 更新展会信息
    if (url.pathname.startsWith("/api/exhibitions/") && req.method === "PUT") {
      try {
        const id = parseInt(url.pathname.split("/").pop());
        const body = await req.json();
        const exhibitions = await readExhibitions();
        const index = exhibitions.findIndex(e => e.id === id);
        
        if (index === -1) {
          return new Response(JSON.stringify({ error: "展会不存在" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }
        
        exhibitions[index] = {
          ...exhibitions[index],
          ...body,
          id: id // 确保ID不被修改
        };
        
        const saved = await saveExhibitions(exhibitions);
        
        if (saved) {
          return new Response(JSON.stringify(exhibitions[index]), {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        } else {
          return new Response(JSON.stringify({ error: "保存失败" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ error: "请求格式错误" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }
    
    // 删除展会
    if (url.pathname.startsWith("/api/exhibitions/") && req.method === "DELETE") {
      const id = parseInt(url.pathname.split("/").pop());
      const exhibitions = await readExhibitions();
      const index = exhibitions.findIndex(e => e.id === id);
      
      if (index === -1) {
        return new Response(JSON.stringify({ error: "展会不存在" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      
      exhibitions.splice(index, 1);
      const saved = await saveExhibitions(exhibitions);
      
      if (saved) {
        return new Response(JSON.stringify({ message: "删除成功" }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } else {
        return new Response(JSON.stringify({ error: "保存失败" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
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
    
    if (url.pathname === "/admin" || url.pathname === "/admin.html") {
      const file = Bun.file("./admin.html");
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
