# MongoDB CRUD Operations – Student Database

## Database Setup

```js
show dbs
show collections

db.createCollection('customer')
```

---

## CREATE (INSERT) – 10 Commands

```js
// 1 Insert one student document
db.students.insertOne({name:"Amol", age:25})

// 2 Insert one document with extra field
db.students.insertOne({name:"Ravi", age:22, city:"Mumbai"})

// 3 Insert multiple documents
db.students.insertMany([
  {name:"Neha", age:23},
  {name:"Pooja", age:21}
])

// 4 Insert document with marks field
db.students.insertOne({name:"Amit", marks:80})

// 5 Insert document with array
db.students.insertOne({name:"Kiran", subjects:["Math","Science"]})

// 6 Insert document with nested object
db.students.insertOne({name:"Sneha", address:{city:"Pune", pin:411001}})

// 7 Insert multiple records again
db.students.insertMany([
  {name:"Rahul", age:24},
  {name:"Anita", age:20}
])

// 8 Insert with custom _id
db.students.insertOne({_id:101, name:"CustomID", age:30})

// 9 Insert boolean field
db.students.insertOne({name:"Test", active:true})

// 10 Insert with date
db.students.insertOne({name:"Demo", createdAt:new Date()})
```

---

## READ (FIND) – 10 Commands

```js
// 1 Fetch all records
db.students.find()

// 2 Pretty format output
db.students.find().pretty()

// 3 Find students with age 25
db.students.find({age:25})

// 4 Find students age greater than 22
db.students.find({age:{$gt:22}})

// 5 Find students age less than 25
db.students.find({age:{$lt:25}})

// 6 Find students from Mumbai
db.students.find({city:"Mumbai"})

// 7 Show only name and age
db.students.find({}, {name:1, age:1})

// 8 Limit results to 3
db.students.find().limit(3)

// 9 Sort by age ascending
db.students.find().sort({age:1})

// 10 Find single record
db.students.findOne({name:"Amol"})
```

---

## UPDATE – Commands

```js
// 1 Update age of Amol
db.students.updateOne({name:"Amol"}, {$set:{age:26}})

// 2 Update multiple records
db.students.updateMany({age:22}, {$set:{status:"young"}})

// 3 Increment age
db.students.updateOne({name:"Ravi"}, {$inc:{age:1}})

// 4 Add city to Neha
db.students.updateOne({name:"Neha"}, {$set:{city:"Delhi"}})

// 5 Set active true for all
db.students.updateMany({}, {$set:{active:true}})

// 6 Rename field marks to score
db.students.updateOne({name:"Amit"}, {$rename:{marks:"score"}})

// 7 Remove age field
db.students.updateOne({name:"Pooja"}, {$unset:{age:""}})

// 8 Add grade for age > 23
db.students.updateMany({age:{$gt:23}}, {$set:{grade:"A"}})

// 9 Add subject to array
db.students.updateOne({name:"Kiran"}, {$push:{subjects:"English"}})

// 10 Add updated timestamp
db.students.updateOne({name:"Test"}, {$set:{updatedAt:new Date()}})
```

---

## DELETE – Commands

```js
// 1 Delete one student
db.students.deleteOne({name:"Amol"})

// 2 Delete students age less than 22
db.students.deleteMany({age:{$lt:22}})

// 3 Delete by ID
db.students.deleteOne({_id:101})

// 4 Delete students from Mumbai
db.students.deleteMany({city:"Mumbai"})

// 5 Delete all records
db.students.deleteMany({})

// 6 Delete Test record
db.students.deleteOne({name:"Test"})

// 7 Delete active users
db.students.deleteMany({active:true})

// 8 Delete students age > 25
db.students.deleteMany({age:{$gt:25}})

// 9 Delete Rahul
db.students.deleteOne({name:"Rahul"})

// 10 Delete grade A students
db.students.deleteMany({grade:"A"})
```

---

## Sample Execution Output

```js
college> use students
switched to db students

students> db.students.insertOne({name:"Amol", age:25})
{
  acknowledged: true,
  insertedId: ObjectId('69e10263a21b15636e3682d1')
}

students> db.students.find()
[
  { _id: ObjectId('69e10263a21b15636e3682d1'), name: 'Amol', age: 25 }
]

students> db.students.find().pretty()
[
  { _id: ObjectId('69e10263a21b15636e3682d1'), name: 'Amol', age: 25 }
]

students> db.students.updateOne({name:"Amol"}, {$set:{age:26}})
{
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1
}

students> db.students.deleteOne({name:"Amol"})
{ acknowledged: true, deletedCount: 1 }

students> db.students.insertOne({name:"Amol", age:25})
{
  acknowledged: true,
  insertedId: ObjectId('69e10325a21b15636e3682d2')
}

students> db.students.find().pretty()
[
  { _id: ObjectId('69e10325a21b15636e3682d2'), name: 'Amol', age: 25 }
]
```
