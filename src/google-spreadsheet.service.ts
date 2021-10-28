import {GoogleSpreadsheet} from "google-spreadsheet";
import {Participant} from "./models/participant.model";

export async function getParticipantsSpreadsheet() {
  try {
    const creds = require('./config/cobalt-alchemy-138823-7634271aebe6.json')
  // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1lqAaHJ0Vt9ytY2EMPqeObsgkCRMXGE6Wi4KTisMqDlI');
    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    const rows = await sheet.getRows()

    const participants = []
    for (let row of rows) {
      const participant: Participant = {
        name: row.Name,
        email: row.Email,
        chance: row.Chance,
        phone: row['Phone number'],
        numberOfYearsInAngular: row['Experience in years with Angular']
      }
      participants.push(participant);
    }
    return participants;
  } catch(err) {
    console.error(err);
  }
}
