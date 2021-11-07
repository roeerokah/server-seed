import {GoogleSpreadsheet} from "google-spreadsheet";
import {FileParticipant, Participant} from "./models/participant.model";
import {Winner} from "./models/winner.model";

export async function getParticipantsSpreadsheet() {
  try {
    const creds = require('./config/cobalt-alchemy-138823-7634271aebe6.json')
  // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1u3F0cR1ruZhzmGsbM9go1RI7gv9IGMER9HarwNRAjdw');
    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    const rows: FileParticipant[] = await sheet.getRows()

    const participants = []
    for (let row of rows) {
      const participant: Participant = {
        name: row.Name,
        email: row['Email address'],
        identityId: row['Identity ID'],
      }
      participants.push(participant);
    }
    return participants;
  } catch(err) {
    console.error(err);
  }
}


export async function writeWinnersToGoogleSheet(winners: Record<string, Participant>) {
  try {
    const creds = require('./config/cobalt-alchemy-138823-7634271aebe6.json')
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1u3F0cR1ruZhzmGsbM9go1RI7gv9IGMER9HarwNRAjdw');
    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    const today = new Date();
    const sheet = await doc.addSheet({ title: `Winners ${today.toString().replace(/:/g, '-')}`, headerValues: ['place', 'identityId', 'name', 'email', 'phone'] });
    const winnersArr: Winner[] = [];
    for (let winnerPlace in winners) {
      const winner: Winner = winners[winnerPlace] as any;
      winner.place = winnerPlace
      winnersArr.push(winner);
    }
    console.log(winnersArr);
    const moreRows = await sheet.addRows(winnersArr);

  } catch(err) {
    console.error(err);
  }
}
