let selectionList=document.getElementById('list');

let cities =[
  {
    arabicName:"الرياض",
    englishName:"Ar Riyāḑ"
  },
  {
    arabicName:"الحدود الشمالية",
    englishName:"Al Ḩudūd ash Shamālīyah"
  },
  {
    arabicName:"الباحة",
    englishName:"Al Bāḩah"
  },
  {
    arabicName:"الجوف",
    englishName:"Al Jawf"
  },
  {
    arabicName:"المدينة المنورة",
    englishName:"Al Madīnah al Munawwarah"
  },
  {
    arabicName:"القصيم",
    englishName:"Al Qaşīm"
  },
 
  {
    arabicName:"الشرقية",
    englishName:"Ash Sharqīyah"
  },
  {
    arabicName:"جازان",
    englishName:"Jāzān"
  },
  {
    arabicName:"مكة المكرمة",
    englishName:"Makkah al Mukarramah"
  },
  {
    arabicName:"نجران",
    englishName:"Najrān"
  },
  {
    arabicName:"تبوك",
    englishName:"Tabūk"
  },

];
//Add cities to Select box
for(let city of cities){
  let content=`
  <option>${city.arabicName}</option>
  `
   document.getElementById('list').innerHTML+=content;
}
//Display Time for city during selection
list.addEventListener('change' ,()=>{
  document.getElementById('city').innerHTML=list.value
  let cityName="";
  for( let c of cities){
    if(list.value == c.arabicName)
    cityName=c.englishName;
  }
  getCityPrayerTime(cityName)
})
function getCityPrayerTime(c){
  let parms={
    country:"SA",
    city:c
  }
  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: parms
  })
  .then(function (response) {
    let time=response.data.data.timings
    document.querySelector('.times').innerHTML=""
    let content=`
    <div class="time">
                <h5>الشروق</h5>
                <p>${time.Sunrise}</p>
            </div>
            <div class="time">
                <h5>الفجر</h5>
                <p>${time.Fajr}</p>
            </div>
            <div class="time">
                <h5>الظهر</h5>
                <p>${time.Dhuhr}</p>
            </div>
            <div class="time">
                <h5>العصر</h5>
                <p>${time.Asr}</p>
            </div>
            <div class="time">
                <h5>المغرب</h5>
                <p>${time.Maghrib}</p>
            </div>
            <div class="time">
                <h5>العشاء</h5>
                <p>${time.Isha}</p>
            </div>
    `
    document.querySelector('.times').innerHTML+=content
    let calender=response.data.data.date.hijri.date;
    let day=response.data.data.date.hijri.weekday.ar;
    let fullDay= day + " - " + calender;
    document.getElementById('day').innerHTML=fullDay
  })
  .catch(function (error) {
    console.log(error);
  })}
  getCityPrayerTime('Ar Riyāḑ')
