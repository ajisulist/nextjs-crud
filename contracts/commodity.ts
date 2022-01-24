export type Commodity = {
  uuid: string;
  komoditas?: string | null;
  area_kota?: string | null;
  area_provinsi?: string | null;
  tgl_parsed?: string | null;
  size?: string | null;
  price?: number | null;
  timestamp: number;
};
