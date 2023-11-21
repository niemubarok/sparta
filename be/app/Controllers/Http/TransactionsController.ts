import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database, { StrictValues } from "@ioc:Adonis/Lucid/Database";

import { Buffer } from "buffer";

export default class TransactionsController {
  public async index({}: HttpContextContract) {
    const transactions = await Database.query() // 👈 gives an instance of select query builder
      .from("transaksi_parkir")
      .select("*");
    return transactions;
  }

  public async create({ request, response }: HttpContextContract) {
    const requestBody = request.body();

    const dataToStore = {
      id: requestBody.id,
      no_pol: requestBody.no_pol,
      id_kendaraan: requestBody.id_kendaraan,
      status: requestBody.status,
      id_pintu_masuk: requestBody.id_pintu_masuk || null,
      id_pintu_keluar: requestBody.id_pintu_keluar,
      waktu_masuk: requestBody.waktu_masuk,
      waktu_keluar: requestBody.waktu_keluar,
      id_op_masuk: requestBody.id_op_masuk || null,
      id_op_keluar: requestBody.id_op_keluar,
      id_shift_masuk: requestBody.id_shift_masuk || null,
      id_shift_keluar: requestBody.id_shift_keluar,
      kategori: requestBody.kategori || null,
      status_transaksi: requestBody.status_transaksi,
      bayar_masuk: requestBody.bayar_masuk || null,
      bayar_keluar: requestBody.bayar_keluar,
      jenis_system: requestBody.jenis_system || null,
      tanggal: requestBody.tanggal,
      pic_body_masuk: requestBody.pic_body_masuk || null,
      pic_body_keluar: requestBody.pic_body_keluar,
      pic_driver_masuk: requestBody.pic_driver_masuk || null,
      pic_driver_keluar: requestBody.pic_driver_keluar || null,
      pic_no_pol_masuk: requestBody.pic_no_pol_masuk || null,
      pic_no_pol_keluar: requestBody.pic_no_pol_keluar || null,
      sinkron: requestBody.sinkron,
      adm: requestBody.adm || null,
      alasan: requestBody.alasan || null,
      pmlogin: requestBody.pmlogin || null,
      pklogin: requestBody.pklogin,
      upload: requestBody.upload,
      manual: requestBody.manual,
      veri_kode: requestBody.veri_kode || null,
      veri_check: requestBody.veri_check || null,
      veri_adm: requestBody.veri_adm || null,
      veri_date: requestBody.veri_date || null,
      denda: requestBody.denda || null,
      extra_bayar: requestBody.extra_bayar || null,
      no_barcode: requestBody.no_barcode || null,
      jenis_langganan: requestBody.jenis_langganan || null,
      post_pay: requestBody.post_pay,
      reff_kode: requestBody.reff_kode,
      valet_adm: requestBody.valet_adm || null,
      waktu_valet: requestBody.waktu_valet || null,
      valet_charge: requestBody.valet_charge || null,
      valet_ops: requestBody.valet_ops || null,
      valet_nopol: requestBody.valet_nopol || null,
      login_waktu_valet: requestBody.login_waktu_valet || null,
      cara_bayar: requestBody.cara_bayar || null,
      unit_member: requestBody.unit_member || null,
      reserved: requestBody.reserved,
      no_voucher: requestBody.no_voucher || null,
      seri_voucher: requestBody.seri_voucher || null,
      no_access_in: requestBody.no_access_in || null,
      no_access_out: requestBody.no_access_out || null,
      inap: requestBody.inap || null,
      casual_denda: requestBody.casual_denda || null,
    };

    // return dataToStore;

    const insertQuery = `
      INSERT INTO transaksi_parkir (
        ${Object.keys(dataToStore).join(", ")}
      ) VALUES (
        ${Object.values(dataToStore)
          .map((value) => (value === null ? "NULL" : `'${value}'`))
          .join(", ")}
      )`;

    const store = await Database.rawQuery(insertQuery);

    return store;
  }

  public async store({}: HttpContextContract) {}

  public async getDataByNopol({ request, response }: HttpContextContract) {
    const no_pol = request.body().no_pol;
    // console.log(request.body());

    const transaction = await Database.rawQuery(
      `SELECT no_pol, waktu_masuk, pic_body_masuk, pic_driver_masuk,status, id_pintu_masuk, waktu_masuk FROM transaksi_parkir WHERE no_pol = '${no_pol}' Limit 1`
    );

    // return transaction.rows;
    response.status(200).json(transaction.rows);
  }

  // import { Blob, FileReader } from 'fs'
  // import { Buffer } from 'buffer';

  public async getPicture({ request, response }: HttpContextContract) {
    const no_pol = request.body().no_pol;
    const pic = await Database.rawQuery(
      `SELECT pic_body_masuk FROM transaksi_parkir WHERE no_pol = '${no_pol}'`
    );
    const picBodyMasuk = pic.rows[0].pic_body_masuk;
    // const bufferToString = buffer.toString("base64");

    // response.header("Content-Type", "image/png");
    response.send(picBodyMasuk);
    // response.send(picBodyMasuk);
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
