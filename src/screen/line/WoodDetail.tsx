import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Dot from '../../assets/classify_dot.svg'
import { Select } from "antd";

const WoodDetail: React.FC = () => {
    const [openAllImage, setOpenAllImage] = useState(false)
    const dataWood = [
        {
            id: 1,
            common_name: "แดง",
            eng_name: ["ironwood", "Daeng"],
            botanical_name: "Xylia xylocarpa (Roxb.) W. Theob",
            pedigree: "FABACEAE",
            place_of_origin:
                "ขึ้นทั่วไปในป่าเบญจพรรณแล้ง ทางเหนือ ภาคกลาง ตะวันกลาง ตะวันออกเฉียงเหนือ และภาคใต้",
            wood_characteristics:
                "สีแดงหรือน้ำตาลอมแดง เสี้ยนสนเป็นคลื่น เนื้อค่อนข้างละเอียด",
            anatomical_characteristics:
                "พอร์เป็นแบบ พอร์เดี่ยวส่วนมาก พอร์แฝดมีน้อย การเรียงตัวมีทั้งแบบ solitary และ oblique การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) ทางภายใน พอร์มี ไทโลส (tylose) เกือบทุกพอร์ พอร์มีขนาดปานกลาง เส้นเรย์เห็นชัด",
            other: "",
            image: "https://file.sogoodweb.com/upload/156/UzDBB7M2iE.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 2,
            common_name: "ชุมแพรก",
            eng_name: ["Chum phraek"],
            botanical_name: "Heritiera javanica (Blume) Kosterm.",
            pedigree: "MALVACEAE",
            place_of_origin:
                "ขึ้นประปรายอยู่ตามป่าดงดิบทางภาคตะวันออก ภาคกลาง และภาคใต้ที่สูงจากระดับน้ำทะเลไม่เกิน 500 เมตร",
            wood_characteristics:
                "เลื่อยใหม่ๆ สีแดงเข้มเมื่อถูกอากาศจะเป็นสีน้ำตาลอมแดง เป็นมันเสี้ยนตรง สม่ำเสมอ",
            anatomical_characteristics:
                "ส่วนใหญ่เป็นแบบ พอร์แฝด (multiple pore) แบบของการเรียงตัวไม่เด่นชัด การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ใหญ่ ภายในพอร์ มีสารตกค้าง (deposit) เป็นบางพอร์ เส้นนเรย์เห็นชัด มีพาเรงคิมาเป็นแบบ พาเรงคิมาแบบกระจาย (diffuse parenchyma)",
            other: "",
            image:
                "https://www.igetweb.com/uploads/2862/filemanager/af081b0d4d8dd27920b06ae6c9781c24_full.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 3,
            common_name: "แอ๊ก",
            eng_name: ["Balau", "Aek"],
            botanical_name: "Shorea glauca King",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นเป็นหมู่ประปรายในป่าดงดิบเขา ตามชายทะเลและเกาะต่างๆ ทางภาคใต้ ตอนล่างที่สูงจากระดับน้ำทะเล 100-400 เมตร",
            wood_characteristics:
                "สีน้ำตาลอ่อนถึงน้ำตาลแกมแดง เสี้ยนตรง เนื้อค่อนข้างหยาบ แต่สม่ำเสมอ แข็ง เหนียว",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) พอร์แฝด (multiple pore) ปนบ้างเล็กน้อย แบบของ การเรียงตัวไม่เด่นชัด การกระจายเป็นแบบกระจัดกระจาย (diffuse porous) พอร์ใหญ่ มี tylose อยู่เกือบ ทุกพอร์ เส้นเรย์เห็นชัด พาเรงคิมาเป็นแบบ พาเรงคิมาแบบปีก (aliform parenchyma) มีท่อยางต่อเรียง ยาวตัดกับเส้นเรย์",
            other: "",
            image: "https://ecochoice.co.uk/misc/image/98628/740/0",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 4,
            common_name: "สัก",
            eng_name: ["Teak"],
            botanical_name: "Tectona grandis L. f.",
            pedigree: "LABIATAE",
            place_of_origin:
                "ขึ้นเป็นหมู่อยู่ในป่าเบญจพรรณทางภาคเหนือ และบางส่วนของภาคกลาง และภาคตะวันตก",
            wood_characteristics:
                "สีเหลืองทองถึงสีน้ำตาล มีน้ำมันในตัวมีลายสีแก่แทรก มีกลิ่นคล้ายหนังฟอก แห้ง เสี้ยนตรงเนื้อหยาบ ไม่สม่ำเสมอ ทนทานมาก ไม้เนื้อแข็ง",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) และ พอร์แฝด (mutiple pore) แบบของการเรียงตัว ไม่เด่นชัด การกระจายเป็นแบบ ring porous พอร์มีทั้งใหญ่ และ ขนาดป่านกลาง ภายในพอร์มีสารแทรก (deposit) สีขาว เป็นบางพอร์ เส้นเรย์เห็นชัด พาเรงคิมาเป็นแบบ พาเรงคิมาต้นฤดู (inital parenchyma)",
            other: "",
            image:
                "https://www.gardeningknowhow.com/wp-content/uploads/2023/06/Teak-Tree.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 5,
            common_name: "รัง",
            eng_name: [
                "Burmese Sal",
                "Rang, Dark red meranti",
                "Light red meranti",
                "Red lauan",
            ],
            botanical_name: "Shorea siamensis Miq.",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นเป็นหมู่ใหญ่ ๆ ในป่าเบญจพรรณแล้งและป่าแดงทั่วไปปะปนอยู่กับไม้เต็ง ในพื้นที่ที่ดินเป็นลูกรัง หิน กรวดทรายเป็นส่วนใหญ่ ที่อยู่สูงจากระดับ น้ำทะเล 500-1,000 เมตร ทางภาคใต้มีอยู่บ้างตามเขาหินปูน",
            wood_characteristics:
                "สีน้ำตาลอ่อนหรือสีน้ำตาลอมเหลือง เสี้ยนสน เนื้อหยาบ แต่สม่ำเสมอ",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) มากกว่า พอร์แฝด (multiple pore) แบบของการเรียงตัว ไม่เด่นชัด การกระจายเป็นแบบ difuse พอร์ใหญ่ ภายในพอร์มีไทโลส (tylose) เกือบทุกพอร์ เสันเรย์เห็นชัด เป็นแบบ diffuse และ พาเรงคิมาแบบปีก (aliform parenchyma) มีท่อยางต่อเรียงยาวตัดกับเส้นเรย์",
            other: "",
            image:
                "https://t4.ftcdn.net/jpg/03/08/35/87/360_F_308358710_5WiuxvRUUg0p28HdlBBWUrNBz63z2lrx.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 6,
            common_name: "ยางพารา",
            eng_name: ["Rubberwood"],
            botanical_name: "Hevea brasiliensis (Kunth) Mull. Arg.",
            pedigree: "EUPHORBIACEAE",
            place_of_origin:
                "เป็นไม้ที่มีถิ่นกำเนิดในทวีปอเมริกาใต้ มีผู้นำเข้ามาปลูกในประเทศไทย เพื่อเอาน้ำยาง ที่ขึ้นได้ดีและให้ผลผลิตน้ำยางสูงได้แก่ทางภาคใต้ และ ภาคตะวันออกเฉียงเหนือ",
            wood_characteristics:
                "สีขาวอมเหลือง เนื้อไม้ละเอียดปานกลาง เสี้ยนสน แข็งเหนียว บิดตัวง่าย",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) และ พอร์แฝด (multiple pore) แบบของการเรียงตัว ชัด การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ใหญ่ภายใน (deposit) เกือบทุกพอร์ เส้นเรย์เห็นชัด พาเรงคิมาเป็นแบบ พาเรงคิมาแบบไม่ติดพอร์ (melaacheal parenchyma)",
            other: "",
            image:
                "https://cdn.britannica.com/21/75921-050-A34DC6E2/Latex-rubber-tree.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 7,
            common_name: "ยาง",
            eng_name: ["Yang", "Gurjun", "Keruing"],
            botanical_name: "Dipterocarpus spp.",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นเป็นหมูในป่าตงดิบและตามที่ต่ำที่ชุ่มชื้น กับบริเวณใกล้เคียงกับแม่น้ำ ลำธารในป่าดิบและป่าอื่น ๆ ทั่วไปที่สูงจากระดับน้ำทะเล 200-600 เมตร",
            wood_characteristics:
                "สีน้ำตาลแดงหรือสีน้ำตาลเทา เสี้ยนตรง เนื้อหยาบ แข็งปานกลาง",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) เกือบทั้งหมด แบบของการเรียงตัวไม่เด่นชัด การกระจาย เป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ใหญ่มาก เส้นเรย์เห็นชัด มีท่อยางเรียงต่อกัน 34 ท่อ อยู่ใกล้ ๆ พอร์",
            other: "",
            image:
                "https://www.nparks.gov.sg/-/media/nparks/migrated/heritage-trees/ht-2003-49/trunkandcrown.ashx",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 8,
            common_name: "พะยูง",
            eng_name: ["Rosewood", "Siamese Rosewood", "Phayuung"],
            botanical_name: "Dalbergia cochinchinensis Pierre",
            pedigree: "FABACEAE",
            place_of_origin:
                "ขึ้นกระจัดกระจายในป่าเบญจพรรณชื้นและปาดิบแล้งทั่วไป ทางภาค ตะวันออก และตะวันออกเฉียงเหนือ ที่สูงจากระดับน้ำทะเลประมาณ 100-200 เมตร",
            wood_characteristics:
                "สีแดงอมม่วง หรือสีม่วงเป็นมันมีลายสีดำ หรือสีน้ำตาลอ่อน เสี้ยนสน เป็นริ้วแคบ ๆ เนื้อละเอียดเหนียว แข็ง",
            anatomical_characteristics:
                "พอร์ ส่วนมากเป็น พอร์เดี่ยว (solitary pore) พอร์แฝด (multiple pore) มีน้อย แบบของ ยงตัวไม่เด่นชัด การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ใหญ่ ภาย มีสารตกค้าง (deposit) เป็นบางพอร์ เส้นเรย์เห็นไม่ค่อยซัด พาเรงคิมาเป็นแบบ พาเรงคิมาแบบปีก (alform parenchyma) และ พาเรงคิมาแบบปีกต่อ (confuent parenchyma) มีลายริ้ว (ripplemark)",
            other: "",
            image:
                "https://housing.com/news/wp-content/uploads/2023/01/Teak-tree-shutterstock_1868125927-1200x700-compressed.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 9,
            common_name: "มะค่าโมง",
            eng_name: ["Black rosewood", "pod Mahogany", "Doussie"],
            botanical_name: "Afzelia xylocarpa (Kurz) Craib",
            pedigree: "FABACEAE",
            place_of_origin:
                "ขึ้นในป่าเบญจพรรณขึ้น และป่าดิบแล้ง ตามภาคต่าง ๆ ทั่วไป ยกเว้นภาคใต้",
            wood_characteristics:
                "สีน้ำตาลอมเหลือง เสี้ยนค่อนข้างสน เนื้อหยาบ มีริ้วแทรก แข็งเหนียว",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) และ พอร์แฝด (multiple pore) แบบของการเรียงตัว ไม่เด่นชัด การกระจายเป็นแบบ กระจัดกระจาย (difuse porous) พอร์ใหญ่ ภายในพอร์มีสารตกค้าง (deposit) สีน้ำตาล เส้นเรย์เห็นชัด พาเรงคิมาเป็นแบบ พาเรงคิมาแบบปีก (aliform parenchyma) พาเรงคิมาแบบปีกต่อ (confluent parenchyma) และ พาเรงคิมาปลายฤดู (terminal parenchyma)",
            other: "",
            image:
                "https://www.castellanalegnami.it/wp-content/uploads/2018/04/Castellana-Legnami-albero-doussie-ok.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 10,
            common_name: "พะยอม",
            eng_name: ["Phayom", "White meranti"],
            botanical_name: "Shorea roxburghii G. Don",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นตามป่าเบญจพรรณชื้นและแล้งหรือป่าดิบแล้งทั่วไปทุกภาค ที่สูงจาก ระดับน้ำทะเล 60-1,200 เมตร",
            wood_characteristics:
                "สีเหลืองอ่อน ทิ้งไว้นาน ๆ จะกลายเป็น สีน้ำตาล มีเส้นสีดำซึ่งเป็นท่อน้ำ ท่อน้ำมันผ่านเสมอ เสี้ยนสน เนื้อค่อนข้างหยาบ แข็งและเหนียว",
            anatomical_characteristics:
                "พอร์ เป็นแบบ พอร์เดี่ยว (solitary pore) และ พอร์แฝด (mutiple pore) แบบของการเรียงหัว เด่นชัด การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ใหญ่ ทางภายในพอร์ มีไทโลส (tylose) เป็นบางพอร์ พาเรงคิมาเป็นแบบ พาเรงคิมาแบบปีก (aliform parenchyma) พาเรงคิมาแบบปีกต่อ (confluent parenchyma) มีท่อยางที่ยังไม่แข็งตัวต่อเรียงยาวตัดกับเส้นเรย์",
            other: "",
            image:
                "https://previews.123rf.com/images/nuttaya/nuttaya1802/nuttaya180200001/94756287-white-meranti-bloom-in-the-spring-of-thailand.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 11,
            common_name: "ตะเคียนราก",
            eng_name: ["Takhian rak"],
            botanical_name: "Hopea pierrei Hance",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นตามป่าดงดิบทางภาคใต้ที่ค่อนข้างราบ และมีการระบายน้ำดี สูงจากระดับน้ำทะเลไม่เกิน 300 เมตร",
            wood_characteristics:
                "สีน้ำตาลอมเหลืองอมเขียว เสี้ยนสนเล็กน้อย เนื้อไม้ค่อนข้างละเอียดคล้ายตะเคียนทองมาก",
            anatomical_characteristics:
                "พอร์เป็นแบบ พอร์เดี่ยว (solitary pore) พอร์แฝดมีน้อย แบบของการเรียงตัวไม่ด่นซัด การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ขนาดปานกลาง ทางภายใน พอร์มีไทโลส (tylose) บ้างเป็นบางพอร์ มีท่อยางต่อเรียงเป็นแนวยาวตัดกับเป็นเส้นเรย์ เส้นเรย์เห็นชัดพาเรงคิมาเป็นแบบ พาเรงคิมาแบบปีก (aliform parenchyma)",
            other: "",
            image:
                "https://previews.123rf.com/images/nuttaya/nuttaya1802/nuttaya180200001/94756287-white-meranti-bloom-in-the-spring-of-thailand.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 12,
            common_name: "ตะเคียนทอง",
            eng_name: ["Thingan", "Takhian thong"],
            botanical_name: "Hopea odorata Roxb.",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นเป็นหมู่กระจัดกระจายอยู่ตามที่ราบหรือค่อนข้างราบใกล้ฝั่งน้ำในป่าดงดิบทั่วประเทศ",
            wood_characteristics:
                "สีน้ำตาลอมเหลือง มีเส้นสีเทาหรือขาวผ่านเสมอซึ่งเป็นท่อยาง เสี้ยนสน เล็กน้อย เนื้อค่อนข้างละเอียด",
            anatomical_characteristics:
                "พอร์มีทั้งแบบ พอร์เดี่ยว (solitary pore) และ พอร์แฝด (multiple pore) แบบของการเรียงตัวไม่เด่นชัด การกระจายเป็นแบบ กระจัดกระจาย (difiuse porous) ทางภายในพอร์มิไทโลส (tylose) บ้างเป็นบางพอร์ พอร์ใหญ่มีท่อยางต่อเป็นแนวยาวเรียงตัดกันเป็นเส้นเรย์ เส้นเรย์เห็นซัด พาเรงคิมาเป็นแบบ พาเรงคิมาแบบกระจาย (diffuse parenchyma) และ พาเรงคิมาแบบปีก (aliform parenchyma)",
            other: "",
            image:
                "https://previews.123rf.com/images/nuttaya/nuttaya1802/nuttaya180200001/94756287-white-meranti-bloom-in-the-spring-of-thailand.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        {
            id: 13,
            common_name: "เต็ง",
            eng_name: ["Siamese Sal", "Thitya", "Teng"],
            botanical_name: "Shorea obtusa Wall.ex Blume",
            pedigree: "DIPTEROCARPACEAE",
            place_of_origin:
                "ขึ้นเป็นหมูใหญ่ ๆ ตามป่าแดงหรือป่าเบญจพรรณแล้งที่เป็นดินลูกรัง และ เขาหินทรายปะปนอยู่กับพวกไม้รัง เหียง พลวง ทั่วๆไป ยกเว้นทางภาคใต้",
            wood_characteristics:
                "สีน้ำตาลแกมแดง เสี้ยนสน เนื้อหยาบ แต่สม่ำเสมอ",
            anatomical_characteristics:
                "พอร์เป็นแบบ พอร์เดี่ยว (solitary pore) และ พอร์แฝด (multiple pore) แบบของการเรียงตัว ไม่เด่นชัด การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) พอร์ใหญ่ ทางภายในพอร์มีไทโลส (tylose) เกือบทุกพอร์มีท่อยางเรียงต่อกันยาวตัดกับเส้นเรย์ เส้นเรย์เห็นชัด พาเรงคิมาเป็นแบบ พาเรงคิมาแบบปีก (aliform parenchyma) และ พาเรงคิมาแบบปีกต่อ (confluent parenchyma)",
            other: "",
            image:
                "https://previews.123rf.com/images/nuttaya/nuttaya1802/nuttaya180200001/94756287-white-meranti-bloom-in-the-spring-of-thailand.jpg",
            create_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            update_at: "อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566",
            create_by: 1213,
            update_by: 523,
        },
        
    ];
    const { woodId } = useParams();
    const [wood, setWood] = useState(dataWood.filter((value) => value.id.toString() == woodId)[0]);
    const [column, setColumn] = useState(2);
    console.log();
    
    return (
        <div className="min-h-screen Kanit relative">
            {wood && !openAllImage && (<div>
                <img src={wood.image} alt="" />
                <div className="flex justify-center mt-5">
                    <button onClick={() => setOpenAllImage(true)} className="px-8 py-2 bg-[#3C6255] text-white rounded-lg">ดูรูปทั้งหมด</button>
                </div>
                <div className="mt-5 mx-6 mb-4">
                    <div className="text-sm flex justify-between items-center text-[#BCBCBC]">
                        <p>อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566</p>
                        <p>โดย ทธรรษ ธีรชูวิวัฒน์ </p>
                    </div>
                    <div className="mt-1 custom-dashed p-4 rounded-xl space-y-4">
                        <p className="text-2xl">{wood.common_name}</p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <img src={Dot} alt="" />
                                <p>ชื่อสามัญ : {wood.common_name}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={Dot} alt="" />
                                <p>ชื่อการค้า-ชื่ออังกฤษ : {wood.eng_name.join(", ")}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={Dot} alt="" />
                                <p>ชื่อพฤษศาสตร์ : {wood.botanical_name}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={Dot} alt="" />
                                <p>วงศ์ : {wood.pedigree}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={Dot} alt="" />
                                <p>ถิ่นกำเนิด : {wood.place_of_origin}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={Dot} alt="" />
                                <p>ลักษณะเนื้อไม้ : {wood.wood_characteristics}</p>
                            </div>
                            <div className="flex space-x-2">
                                <img src={Dot} alt="" className="self-start pt-1" />
                                <div>
                                    <p>ลักษณะทางกายวิภาค : เห็นได้ด้วยแว่นขยาย 10-15 เท่า (handlens)</p>
                                    <p>{wood.anatomical_characteristics}</p>
                                </div>
                            </div>
                            {wood.other && (
                                <div className="flex items-center space-x-2">
                                    <img src={Dot} alt="" />
                                    <p>อื่นๆ : </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>)}
            {openAllImage && wood && (
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <p className="text-xl font-bold">แสดง</p>
                            <Select
                                defaultValue="2"
                                style={{ width: 120 }}
                                onChange={(value) => {
                                    setColumn(parseInt(value))
                                }}
                                options={[
                                    { value: '1', label: '1 คอลัมน์' },
                                    { value: '2', label: '2 คอลัมน์' },
                                    { value: '3', label: '3 คอลัมน์' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={`grid grid-cols-${column} gap-2 pt-4`}>
                        {wood &&
                            Array.from({ length: 20 }).map((_, index) => {
                                return <img onClick={() => setOpenAllImage(false)} className="rounded-lg" key={index} src={wood.image} alt="" />
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default WoodDetail;
