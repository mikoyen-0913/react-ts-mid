import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import { asyncGet } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'

function App() {

  const [students, setStudents] = useState<Array<Student>>([])

  const cache = useRef<boolean>(false)

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body)
        }
      });
    }
  }, [])

const [searchTerm, setSearchTerm] = useState<string>("");

const searchedStudents = students.filter(student => 
  student.name.includes(searchTerm)
);

const searchedList = searchedStudents.map(student => (
  <div className='student' key={student._id}>
    <p>姓名: {student.name}</p>
    <p>帳號: {student.userName}</p>
  </div>
));

// In your JSX
<div className="name-search">
  <h2>姓名搜尋</h2>
  <input 
    type="text" 
    value={searchTerm} 
    onChange={e => setSearchTerm(e.target.value)} 
    placeholder="搜尋姓名" 
  />
  {searchedList}
</div>


    // Function to calculate department statistics
const getDepartmentStatistics = () => {
  const stats: Record<string, number> = {};
  students.forEach(student => {
    stats[student.department] = (stats[student.department] || 0) + 1;
  });
  return stats;
};

const departmentStats = getDepartmentStatistics();

const departmentList = Object.entries(departmentStats).map(([department, count]) => (
  <div key={department}>
    <p>{department}: {count} 人</p>
  </div>
));

  const studentList = students ? students.map((student: Student) => {
    return (
      <div className='student' key={student._id}>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>Email: {student.email}</p>
        <p>缺席次數: {student.absences ? student.absences : 0}</p>
      </div>
    )
  }) : "loading"




  return (
    <>
    {/* Name Search */}
    <div className="name-search">
        <h2>姓名搜尋</h2>
        <input 
          type="text" 
          //value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          //placeholder="搜尋姓名" 
        />
        {searchedList}
      </div>
    <div className="department-stats">
    <h2>科系人數統計</h2>
    {departmentList}
  </div>
      <div className="container">
        {studentList}
      </div>
    
  </>
  
  )
}

export default App
