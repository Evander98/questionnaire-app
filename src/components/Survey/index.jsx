import axios from "axios";
import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { urlAPI } from "../../assets/URLs";
import { AnswerWrapper, Bar, BarContainer, QuestionWrapper, Radio, Button, SurveyContainer, Text, TextInput, Title } from "./SurveyElements";

const staticData = [
  {
    question : 'Jenis Kelamin :',
    options : ['Laki-laki', 'Perempuan']
  },
  {
    question : 'Profesi :',
    options : ['Pegawai Negeri Sipil', 'Swasta', 'Wiraswasta', 'Dosen', 'Pelajar/Mahasiswa', 'Lainnya']
  },
  {
    question : 'Seberapa sering saudara melakukan transaksi belanja online dalam satu bulan?',
    options : ['1-2 kali', '3-4 kali', '>4 kali']
  },
  {
    question : 'Mengapa saudara tertarik melakukan pembelian produk secara online?',
    options : ['Mudah membandingkan harga dan produk', 'Bisa mendapatkan privasi dan tidak akan merasa malu membeli barang yang bersifat pribadi', 'Harga lebih murah dibandingkan dengan toko nyata']
  },
  {
    question : 'Seberapa banyak saudara menghabiskan uang dalam sekali transaksi belanja online?',
    options : ['< Rp. 100.000', 'Rp. 100.000 - Rp. 500.000', 'Rp. 500.000 - Rp. 1.000.000', '> Rp. 1.000.000']
  },
  {
    question : 'Metode pembayaran apakah yang saudara lakukan dalam berbelanja online?',
    options : ['Credit Card', 'Transfer / ATM', 'Pembayaran setelah barang dikirim ( Cash on delivery )']
  },
]

const Survey = () => {
  const [data, setData] = useState([])
  const [interviewee, setInterviewee] = useState('')
  const [answer, setAnswer] = useState([])
  const [idContainer, setIdContainer] = useState([])
  const [page, setPage] = useState(1)
  // useEffect(() => {
  //   axios.get(urlAPI + '/questionnaire/getQuestions')
  //   .then(res => {
  //     console.log(res.data)
  //     setData(res.data)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, [])

  // const renderQuestion = () => {
  //   return data.map((key, index) => (
  //     <QuestionWrapper>
  //       <Text>{(index+7) + '. ' + key.question}</Text>
  //       {key.options.map((value) => (
  //         <AnswerWrapper>
  //           <Radio type="radio" name={key.question} value={value} />
  //           <Text for={value}>{value}</Text>
  //         </AnswerWrapper>
  //       ))}
  //     </QuestionWrapper>
  //   ));
  // };

  useEffect(() => {
    axios.get(urlAPI + '/category/getCategory')
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const paginationHandler = () => {
    for(let i=page; i<=3; i++){
      return <BarContainer>
        <Bar active={i}></Bar>
        <Bar active={i}></Bar>
        <Bar active={i}></Bar>
      </BarContainer>
    }
  }

  const nextPageHandler = () => {
    let index = 0
    console.log(index)
    if(page == 2){
      for(let i = 0; i < staticData.length; i++){
        for(let j = 0; j < staticData[i].options.length; j++){
          document.getElementsByTagName('input')[index].checked = false
          index+=1
        }
      }
    }
    setPage(prevState => prevState + 1)
  }

  const onAnswerHandler = (id, value) => {
    let tempArr = [...answer]
    let newId = [...idContainer]
    let length = tempArr.length || 1
    let counter = 0
    for(let i = 0; i < length; i++){
      if(tempArr.some(arr => arr.id === id)){
        if(counter<1){
          if(newId.indexOf(id)){
            tempArr[newId.indexOf(id)].value = value
          }else{
            tempArr[i].value = value
          }
        }
      }else{
        tempArr.push({id, value})
        newId.push(id)
      }
      counter+=1
    }
    setAnswer(tempArr)
    setIdContainer(newId)
  }

  const onSend = () => {
    if(interviewee && answer.length + 6 == data.length + 6){
      axios.post(`${urlAPI}/survey/sendData?interviewee=${interviewee}`, answer)
      .then(res => {
        Swal.fire({
          position: 'top-end',
          icon: "success",
          title: 'Thank You!',
          text: res.data,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      Swal.fire({
        icon: "error",
        title: 'Oops...',
        text: `Please answer all the question!`,
      })
    }
  }

  const renderQuestion = () => {
    const radio = ['Facebook', 'Instagram', 'Twitter', 'Tiktok']
    return data.map((key, index) => (
      <QuestionWrapper key={key.id}>
        <Text>{index + 1}. Media sosial mana yang akan saudara gunakan untuk membeli {key.category_name}?</Text>
        {
          radio.map((val, idx) => (
            <AnswerWrapper onChange={(e) => onAnswerHandler(key.id, e.target.value)}>
              <Radio type='radio' name={key.category_name} value={idx+1}/>
              <Text for={val}>{val}</Text>
            </AnswerWrapper>
          ))
        }
      </QuestionWrapper>
    ))
  }

  const renderStaticData = () => {
    return staticData.map((key, index) => (
      <QuestionWrapper>
        <Text>{(index+1) + '. ' + key.question}</Text>
        {key.options.map((value) => (
          <AnswerWrapper>
            <Radio type="radio" name={key.question} value={value} />
            <Text for={value}>{value}</Text>
          </AnswerWrapper>
        ))}
      </QuestionWrapper>
    ));
  };

  return (
    <SurveyContainer>
      {paginationHandler()}
      <Title>Kuesioner Penelitian</Title>
      {
        page == 1 ?
        <AnswerWrapper>
          <Text>Siapa nama anda?</Text>
          <TextInput type='text' value={interviewee} onChange={e => setInterviewee(e.target.value)} validation={interviewee.length > 0 ? true : false}/>
        </AnswerWrapper>
        : page == 2 ?
        renderStaticData()
        : page == 3 ?
        renderQuestion()
        : <Text>No Data</Text>
      }
      {
        page < 3 ?
        <Button onClick={nextPageHandler} disabled={interviewee.length < 1 ? true : false}>Next</Button>
        :
        <Button onClick={onSend}>Send</Button>
      }
    </SurveyContainer>
  );
};

export default Survey;
