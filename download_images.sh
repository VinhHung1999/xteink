#!/bin/bash
# Download all images from xteink.com
# Images are saved to ./images/ directory with clean filenames

OUTPUT_DIR="/Users/phuhung/Documents/Notes/Hung's Notes/Projects/xteink/images"
mkdir -p "$OUTPUT_DIR"

# All unique image URLs (deduplicated, without width/size params for highest quality)
URLS=(
  # === LOGO & BRANDING ===
  "https://www.xteink.com/cdn/shop/files/New_color-Logo-03.svg?v=1757163804"

  # === HOMEPAGE IMAGES ===
  "https://www.xteink.com/cdn/shop/files/24391757652460_.pic.jpg?v=1757657288"
  "https://www.xteink.com/cdn/shop/files/8931757270127_.pic_hd.jpg?v=1757270192"
  "https://www.xteink.com/cdn/shop/files/2.jpg?v=1757678741"
  "https://www.xteink.com/cdn/shop/files/8901757267985_.pic_hd.jpg?v=1757269500"
  "https://www.xteink.com/cdn/shop/files/AT_HOME_BANNER-2.jpg?v=1757270847"
  "https://www.xteink.com/cdn/shop/files/1-1.jpg?v=1757653133"
  "https://www.xteink.com/cdn/shop/files/3671757602844_.pic_hd.jpg?v=1757604670"
  "https://www.xteink.com/cdn/shop/files/800_00031.jpg?v=1757681086"

  # === HOMEPAGE VIDEO THUMBNAILS ===
  "https://www.xteink.com/cdn/shop/files/preview_images/bbbac03f99774fb3a96774465964f510.thumbnail.0000000000_1100x.jpg?v=1757307206"
  "https://www.xteink.com/cdn/shop/files/preview_images/92c07673990c4b4bb93db5779eea18b7.thumbnail.0000000000_700x.jpg?v=1757257531"
  "https://www.xteink.com/cdn/shop/files/preview_images/f0de7f3d0fcc41f18f7b1de444ee8a6a.thumbnail.0000000000_1100x.jpg?v=1757653237"
  "https://www.xteink.com/cdn/shop/files/preview_images/5f0c2a81f49e4a5f89d0ee3cb655625a.thumbnail.0000000000_1100x.jpg?v=1757653365"
  "https://www.xteink.com/cdn/shop/files/preview_images/074b9b4cec564ce697f889f7736a43a9.thumbnail.0000000000_1100x.jpg?v=1757680089"
  "https://www.xteink.com/cdn/shop/files/preview_images/d2daa26e55584d39b5672b8c29e9d5ff.thumbnail.0000000000_700x.jpg?v=1757686737"

  # === GUARANTEE ICONS ===
  "https://www.xteink.com/cdn/shop/files/delivery--parcel_1_1.svg?v=1757182400"
  "https://www.xteink.com/cdn/shop/files/Free_30-Day_Return-1.svg?v=1757182401"
  "https://www.xteink.com/cdn/shop/files/tools_1.svg?v=1757182400"
  "https://www.xteink.com/cdn/shop/files/tools_2.svg?v=1757182401"

  # === X4 PRODUCT GALLERY ===
  "https://www.xteink.com/cdn/shop/files/9741757520180_.pic_hd.jpg?v=1757584213"
  "https://www.xteink.com/cdn/shop/files/9751757520181_.pic_hd.jpg?v=1757584213"
  "https://www.xteink.com/cdn/shop/files/9761757520181_.pic_hd.jpg?v=1757584213"
  "https://www.xteink.com/cdn/shop/files/9771757520182_.pic_hd.jpg?v=1757678809"
  "https://www.xteink.com/cdn/shop/files/9721757520179_.pic_hd.jpg?v=1757678809"
  "https://www.xteink.com/cdn/shop/files/9731757520180_.pic_hd.jpg?v=1757678809"

  # === X4 PRODUCT PAGE - BANNERS & FEATURES ===
  "https://www.xteink.com/cdn/shop/files/1.jpg?v=1757678479"
  "https://www.xteink.com/cdn/shop/files/p12c.jpg?v=1757933027"
  "https://www.xteink.com/cdn/shop/files/preview_images/8f806a061e56409db54a10ae22f87761.thumbnail.0000000000_1100x.jpg?v=1757503996"
  "https://www.xteink.com/cdn/shop/files/preview_images/3fd79e204de0418dabbad8f03b0598ce.thumbnail.0000000000_700x.jpg?v=1757504278"

  # === X4 LIFESTYLE IMAGES ===
  "https://www.xteink.com/cdn/shop/files/8871757267980_.pic_hd.jpg?v=1757419096"
  "https://www.xteink.com/cdn/shop/files/8881757267983_.pic_hd.jpg?v=1757419226"
  "https://www.xteink.com/cdn/shop/files/8861757267980_.pic_hd.jpg?v=1757419258"
  "https://www.xteink.com/cdn/shop/files/AT_HOME_HENG_-1.jpg?v=1757419403"

  # === X4 SPECS & FEATURES ===
  "https://www.xteink.com/cdn/shop/files/Spec..png?v=1757937760"
  "https://www.xteink.com/cdn/shop/files/MAGSAGE-02.jpg?v=1757937996"
  "https://www.xteink.com/cdn/shop/files/278891757526357_.pic_hd.jpg?v=1757588361"
  "https://www.xteink.com/cdn/shop/files/750x1050.png?v=1757520229"
  "https://www.xteink.com/cdn/shop/files/what_s_in_the_box_xteink.jpg?v=1760944753"

  # === X4 FEATURE ICONS ===
  "https://www.xteink.com/cdn/shop/files/icon-01_ecd382ef-8dc5-4b51-bfce-fa74ab9f833e.png?v=1757697284"
  "https://www.xteink.com/cdn/shop/files/icon-02_6507b757-1ce1-41bd-91f1-af672f3a7ddb.png?v=1757697284"
  "https://www.xteink.com/cdn/shop/files/icon-03_65bdec5a-b9cc-4ed7-b0d9-7a078a96b60f.png?v=1757697284"
  "https://www.xteink.com/cdn/shop/files/icon-04_91a9c038-cfaf-474e-a3d8-f060715a5896.png?v=1757697284"
  "https://www.xteink.com/cdn/shop/files/icon-05_2755cd63-c256-42a1-a25e-226ccab46911.png?v=1757697284"
  "https://www.xteink.com/cdn/shop/files/icon-06_fb833c8f-3165-43a2-8149-17488dc8bd9d.png?v=1757697284"

  # === X3 PRODUCT IMAGES ===
  "https://www.xteink.com/cdn/shop/files/18901765295137_.pic_hd.jpg?v=1765445458"
  "https://www.xteink.com/cdn/shop/files/18911765295138_.pic_hd.jpg?v=1765445458"

  # === MAGNETIC CASE IMAGES ===
  "https://www.xteink.com/cdn/shop/files/228ee9d99824ebaae36ce53231ed9a3a.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/1_1146df25-e851-413d-b46a-0ae069099460.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/frost_green_case_-1.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/x4_case_-2.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/WechatIMG3036_ffb25e74-f7a8-4a24-9316-c6bfd366e525.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/13441761121029_.pic_hd.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/WechatIMG3035_dddb8900-1641-466c-9dee-a5f27d8be28a.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/13471761121030_.pic_hd.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/IMG_9726_fec823cd-153f-46f3-b413-499726a93e06.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/WechatIMG3027_64bce0f0-4d8b-4f18-b99d-089e237f1ea8.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/13461761121030_.pic_hd.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/WechatIMG3033_6d60d0db-06d1-4ac6-a1b3-2a7b65793f14.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/13451761121030_.pic_hd.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/WechatIMG3031_f4bc6822-b53c-41e9-9776-8a3d7a372409.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/13481761121031_.pic_hd.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/457420556a4ae3b5736e76d8652712d4.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/2_20432b7a-087a-4a9e-845f-02f330465b41.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/2_07cee0cf-123c-44c3-84b0-84d60a9b9986.jpg?v=1762606641"
  "https://www.xteink.com/cdn/shop/files/2_48b635a8-33b8-46ff-95d8-9884744efff8.jpg?v=1762606641"

  # === READING LIGHT IMAGES ===
  "https://www.xteink.com/cdn/shop/files/P1246654.jpg?v=1762606434"
  "https://www.xteink.com/cdn/shop/files/P1246649.jpg?v=1762606434"
  "https://www.xteink.com/cdn/shop/files/readinglight-1.png?v=1762606434"
  "https://www.xteink.com/cdn/shop/files/READING_LIGHTING-2.png?v=1762606434"
  "https://www.xteink.com/cdn/shop/files/light-1.jpg?v=1762606452"

  # === RING IMAGES ===
  "https://www.xteink.com/cdn/shop/files/RING-1.jpg?v=1757937683"
  "https://www.xteink.com/cdn/shop/files/RING-02.jpg?v=1757938140"

  # === SCREEN PROTECTOR ===
  "https://www.xteink.com/cdn/shop/files/PROTECTORS-1.png?v=1761214313"

  # === PROTECTIVE CASE ===
  "https://www.xteink.com/cdn/shop/files/4.jpg?v=1768996898"
  "https://www.xteink.com/cdn/shop/files/2_7cde4a7c-313f-4053-a664-5a1d191e4371.jpg?v=1768995769"
  "https://www.xteink.com/cdn/shop/files/3.jpg?v=1768995769"
  "https://www.xteink.com/cdn/shop/files/1_0a6fecc6-b19b-45e4-ac6a-7c8756b381a8.jpg?v=1768996898"

  # === PLAYGROUND (WALLPAPERS) ===
  "https://www.xteink.com/cdn/shop/files/Christmas.jpg?v=1766566967"
  "https://www.xteink.com/cdn/shop/files/Halloween.jpg?v=1761821923"

  # === ABOUT US ===
  "https://www.xteink.com/cdn/shop/files/39471757335404_.pic_hd.jpg?v=1757335665"
  "https://www.xteink.com/cdn/shop/files/39421757318553_.pic.jpg?v=1757318606"

  # === SUPPORT PAGE ===
  "https://www.xteink.com/cdn/shop/files/User_guide_banner_-1.png?v=1757585003"
  "https://www.xteink.com/cdn/shop/files/13221761117823_.pic_hd.jpg?v=1761539678"

  # === APPS/DOWNLOADS PAGE ===
  "https://www.xteink.com/cdn/shop/files/7d7066f62af9618ec3285187d006e26a.jpg?v=1769358505"
  "https://cdn.shopify.com/s/files/1/0759/9344/8689/files/ChatGPT_Image_2026_2_7_03_05_18.png?v=1770433292"
  "https://cdn.shopify.com/s/files/1/0759/9344/8689/files/Convert_File.png?v=1769441883"
  "https://cdn.shopify.com/s/files/1/0759/9344/8689/files/Easy_Transfer.png?v=1769441883"
  "https://cdn.shopify.com/s/files/1/0759/9344/8689/files/Custom_Wallpaper.png?v=1769441883"
  "https://cdn.shopify.com/s/files/1/0759/9344/8689/files/AI_Reading_Summary.png?v=1769441883"

  # === SITEMAP PRODUCT IMAGES ===
  "https://cdn.shopify.com/s/files/1/0759/9344/8689/files/logo.jpg?v=1760454700"
)

echo "Starting download of ${#URLS[@]} images..."
echo ""

SUCCESS=0
FAIL=0

for url in "${URLS[@]}"; do
  # Extract filename: get the path part, take the last segment, remove query params
  filename=$(echo "$url" | sed 's/?.*//' | awk -F'/' '{print $NF}')

  # Handle preview_images subdirectory
  if echo "$url" | grep -q "preview_images"; then
    filename="preview_$(echo "$url" | sed 's/?.*//' | awk -F'/' '{print $NF}')"
  fi

  # Handle cdn.shopify.com URLs (prefix with "cdn_" to avoid conflicts)
  if echo "$url" | grep -q "cdn.shopify.com"; then
    filename="cdn_${filename}"
  fi

  # Skip if already downloaded
  if [ -f "$OUTPUT_DIR/$filename" ]; then
    echo "SKIP (exists): $filename"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi

  # Download
  if curl -sL -o "$OUTPUT_DIR/$filename" "$url"; then
    filesize=$(wc -c < "$OUTPUT_DIR/$filename" | tr -d ' ')
    if [ "$filesize" -gt 0 ]; then
      echo "OK ($filesize bytes): $filename"
      SUCCESS=$((SUCCESS + 1))
    else
      echo "FAIL (empty): $filename"
      rm -f "$OUTPUT_DIR/$filename"
      FAIL=$((FAIL + 1))
    fi
  else
    echo "FAIL (curl error): $filename"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "=== DOWNLOAD COMPLETE ==="
echo "Success: $SUCCESS"
echo "Failed:  $FAIL"
echo "Total:   ${#URLS[@]}"
echo "Output:  $OUTPUT_DIR"
