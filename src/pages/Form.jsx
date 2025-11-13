import io
import openpyxl
from flask import send_file

@requests_bp.route('/export', methods=['GET'])
def export_requests():
    data = load_db()
    requests_list = data.get("requests", [])

    # Create Excel workbook
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Requests"

    # Header
    ws.append([
        "ID",
        "Дата",
        "Амбассадор",
        "Заведение",
        "Линейка",
        "Аромат",
        "Дистрибьютор",
        "Комментарий",
        "Отгружено",
        "Причина"
    ])

    # Rows
    for r in requests_list:
        ws.append([
            r.get("id", ""),
            r.get("date", ""),
            r.get("ambassador", ""),
            r.get("venue", ""),
            r.get("line", ""),
            r.get("scent", ""),
            r.get("distributor", ""),
            r.get("comment", ""),
            "Да" if r.get("shipped") else "Нет",
            r.get("reason", "") if not r.get("shipped") else ""
        ])

    # Save to bytes
    file_stream = io.BytesIO()
    wb.save(file_stream)
    file_stream.seek(0)

    return send_file(
        file_stream,
        as_attachment=True,
        download_name="requests_export.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )