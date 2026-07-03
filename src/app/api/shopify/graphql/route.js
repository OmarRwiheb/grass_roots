import { NextResponse } from "next/server";
import { shopifyConfig } from "@/config/shopify";

export async function POST(request) {
  try {
    const { query, variables } = await request.json();

    if (!shopifyConfig.storeDomain || !shopifyConfig.storefrontPrivateToken) {
      console.error("Missing Shopify configuration");
      return NextResponse.json({ error: "Shopify configuration missing" }, { status: 500 });
    }

    const resp = await fetch(shopifyConfig.storefrontApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": shopifyConfig.storefrontPrivateToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const payload = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      console.error("Shopify API Error:", resp.status, payload);
      return NextResponse.json(
        { error: `HTTP ${resp.status}`, details: payload?.errors || payload },
        { status: 502 }
      );
    }

    if (payload.errors?.length) {
      console.error("Shopify GraphQL Errors:", payload.errors);
      const message = payload.errors.map((e) => e.message).join(" | ");
      return NextResponse.json({ error: message, details: payload.errors }, { status: 400 });
    }

    return NextResponse.json({ data: payload.data });
  } catch (err) {
    console.error("Shopify GraphQL API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
