const { program } = require('commander');
const contacts = require('./contacts.js');
const {nanoid}  = require('nanoid');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const addedContact = await contacts.addContact({ name, email, phone });
      console.log(addedContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
      break;
  }
};

program
  .option('-a, --action, <tyype>')
  .option('-i, --id, <tyype>')
  .option('-n, --name, <tyype>')
  .option('-e, --email, <tyype>')
  .option('-p, --phone, <tyype>');

program.parse();

const options = program.opts();

invokeAction(options);