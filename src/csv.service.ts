import {FileParticipant, Participant} from "./models/participant.model";

const csv = require('csv-parser')
const fs = require('fs')
export async function getOfflineData(path) {
  return new Promise((resolve, reject) => {
    const results = [];
    try {
      fs.createReadStream(path)
      .on('error', (err) => {
        console.error(err);
        resolve(err)
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const names = {}
        console.log(results);
        const participants: Participant[] = []
        results.forEach((participantFromFile: FileParticipant) => {
          const participant: Participant = {
            name: participantFromFile.Name,
            email: participantFromFile['Email address'],
          }

          // if (!names[participant.name]) {
          //   names[participant.name] = true;
            participants.push(participant);
          // }
        })


        resolve(participants);

        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      });
    } catch (err) {
      resolve(err)
    }
  });
}
