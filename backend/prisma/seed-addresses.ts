import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const subvn = require("sub-vn");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding full Vietnam addresses...");

  // Clear existing address data
  await prisma.ward.deleteMany();
  await prisma.district.deleteMany();
  await prisma.province.deleteMany();

  console.log("Cleared existing address data");

  const provinces = subvn.getProvinces();
  const districts = subvn.getDistricts();
  const wards = subvn.getWards();

  console.log(`Data source: ${provinces.length} provinces, ${districts.length} districts, ${wards.length} wards`);

  // Build lookup maps for performance
  const districtsByProvince = new Map<string, typeof districts>();
  for (const d of districts) {
    const key = d.province_code;
    if (!districtsByProvince.has(key)) districtsByProvince.set(key, []);
    districtsByProvince.get(key)!.push(d);
  }

  const wardsByDistrict = new Map<string, typeof wards>();
  for (const w of wards) {
    const key = w.district_code;
    if (!wardsByDistrict.has(key)) wardsByDistrict.set(key, []);
    wardsByDistrict.get(key)!.push(w);
  }

  // Seed provinces with districts and wards
  let totalDistricts = 0;
  let totalWards = 0;

  for (let pi = 0; pi < provinces.length; pi++) {
    const prov = provinces[pi];
    const createdProvince = await prisma.province.create({
      data: {
        code: prov.code,
        name: prov.name,
        sortOrder: pi,
      },
    });

    const provDistricts = districtsByProvince.get(prov.code) || [];
    for (let di = 0; di < provDistricts.length; di++) {
      const dist = provDistricts[di];
      const createdDistrict = await prisma.district.create({
        data: {
          code: dist.code,
          name: dist.name,
          provinceId: createdProvince.id,
          sortOrder: di,
        },
      });

      const distWards = wardsByDistrict.get(dist.code) || [];
      if (distWards.length > 0) {
        await prisma.ward.createMany({
          data: distWards.map((w: { code: string; name: string }, wi: number) => ({
            code: w.code,
            name: w.name,
            districtId: createdDistrict.id,
            sortOrder: wi,
          })),
        });
        totalWards += distWards.length;
      }

      totalDistricts++;
    }

    if ((pi + 1) % 10 === 0) {
      console.log(`  ${pi + 1}/${provinces.length} provinces seeded...`);
    }
  }

  console.log(`Done! ${provinces.length} provinces, ${totalDistricts} districts, ${totalWards} wards`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
