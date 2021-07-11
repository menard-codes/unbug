import { adminFirestore } from '../../app/firebaseAdmin';

// TODO: Parse the user id
export default async function addProject(req, res) {
  if (req.method === 'POST') {
    const {bugData} = req.body;
  
    try {    
      const docRef = await adminFirestore.collection('Bugs').add(bugData)
      res.json({id: docRef.id})
      res.end()
    } catch (error) {
      res.json({error: error.message})
      res.end()
    }  
  } else {
    res.status(400).json({message: 'error'})
    res.end()
  }
  return
}
