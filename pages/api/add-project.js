import { adminFirestore } from '../../app/firebaseAdmin';

// TODO: Parse the user id
export default async function addProject(req, res) {
  if (req.method === 'POST') {
    const {title} = req.body;
  
    try {    
      const docRef = await adminFirestore.collection('Project').add({title})
      res.json({id: docRef.id})
    } catch (error) {
      res.json({error: error.message})
      res.end()
    }  
  } else {
    res.status(400).json({message: 'Only POST method'})
    res.end()
  }
  return
}
