const prisma = require('../utils/prisma');

const findDiary = async (req, res) => {
  const where = {}
  const foundDiary = await prisma.diary.findMany({
    where,
//     include: { 
//         profile: true, 
//         diary: true }
  })
  res.json({ diaries: foundDiary });
}

//Build a route to create a new diary
const createDiary = async (req, res) => {
    const userId = req.params.id
  const {
    plan,
    affirmation,
  } = req.body;
  console.log("bye", req.body)
  console.log("hello", userId)

  const createdDiary = await prisma.diary.create({
    data: {
      plan,
      affirmation,
      User: {
         connect:{
            id: parseInt(userId)
         }
      }
    },
    include: {
        User: true
    }

  })
  res.json({ data: createdDiary });
}

//Build a route to retrieve a single diary by ID
const diaryById = async (req, res) => {

  const diaryById = await prisma.diary.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  if (!diaryById) {
    res.status(404)
    res.json({ error: 'Diary not found' })
  } else {
    res.json({ data: diaryById });
  }
}


// update
const updateDiary = async (req, res) => {

  const {plan, affirmation} = req.body
  const updatedDiary = await prisma.diary.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      plan,
      affirmation,
    },
  })
  console.log("Checking the updated response", updatedDiary)
  res.json({ data: updatedDiary });
}



module.exports = { createDiary, findDiary, diaryById, updateDiary}  