// contacts.js
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id) || null;
};

const addContact = async data => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async id => {
  const contacts = await listContacts();
  const indexToRemove = contacts.findIndex(contact => contact.id === id);
  if (indexToRemove === -1) return null;
  const [removedContact] = contacts.splice(indexToRemove, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};