import React, { useEffect, useState, useReducer } from "react";
import { urlAPI } from "../../assets/URLs";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  AddQuestionContainer,
  AddQuestionTitle,
  ButtonIcon,
  InputText,
  InputWrapper,
  DeleteItemWrapper,
  QuestionBox,
  QuestionText,
  ItemWrapper,
  SaveButton,
} from "./AddQuestionElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimesCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const AddQuestion = () => {
  const [state, setState] = useState([]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [inputOption, setInputOption] = useState("");
  const [message, setMessage] = useState("");
  const [ignored, forceUpdate] = useReducer((x) => !x, false);

  const user = useSelector((state) => state.user);

  const [inputCategory, setInputCategory] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(urlAPI + "/category/getCategory")
  //     .then((res) => {
  //       setState(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  
  // useEffect(() => {
  //   if (message != "") {
  //     Swal.fire({
  //       icon: message === "Please add anything!" ? "error" : "success",
  //       title: message === "Please add anything!" ? "Oops..." : "Yeah...",
  //       text: message,
  //       confirmButtonText: "OK",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setMessage("");
  //       }
  //     });
  //   }
  // }, [message]);

  // const renderCategory = () => {
  //   return state.map((key, index) => (
  //     <DeleteItemWrapper key={key.id}>
  //       <QuestionText>{index + 1 + ". " + key.category_name}</QuestionText>
  //       <FontAwesomeIcon
  //         icon={faTimesCircle}
  //         color="#F44336"
  //         onClick={() => onDeleteCategory(key.id, key.category_name)}
  //       />
  //     </DeleteItemWrapper>
  //   ));
  // };

  // const onAddCategory = () => {
  //   if(inputCategory){
  //     axios.post(urlAPI + '/category/addCategory', {categoryName: inputCategory})
  //     .then(res => {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Category has been saved',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       setState(res.data)
  //       setInputCategory("")
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   }else{
  //     setMessage('Please add anything!')
  //   }
  // }

  // const onDeleteCategory = (id, category) => {
  //   Swal.fire({
  //     icon: "question",
  //     title: 'Wait...',
  //     text: `Are you sure to delete ${category}?`,
  //     confirmButtonText: "Delete",
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.post(urlAPI + '/category/deleteCategory', {id})
  //       .then(res => {
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'The category has been deleted',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //         setState(res.data)
  //       })
  //     }
  //   });
  // }

  useEffect(() => {
    axios
      .get(urlAPI + "/questionnaire/getQuestions")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (message != "") {
      Swal.fire({
        icon: message === "Please add anything!" ? "error" : "success",
        title: message === "Please add anything!" ? "Oops..." : "Yeah...",
        text: message,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setMessage("");
        }
      });
    }
  }, [message]);

  const onAddQuestion = () => {
    if (inputQuestion) {
      setState((prevState) =>
        prevState.concat({ question: inputQuestion, options: [] })
      );
      setInputQuestion("");
    } else {
      setMessage("Please add anything!");
    }
  }

  const onAddOption = (index) => {
    if (inputOption) {
      state[index].options.push(inputOption);
      setInputOption("");
      document.getElementById(`inputOption${index}`).value = "";
    } else {
      setMessage("Please add anything!");
    }
  }

  const onDeleteQuestion = (index) => {
    const temp = [...state]
    temp.splice(index, 1)

    setState(temp)
  }

  const onDeleteOption = (index, idx) => {
    state[index].options.splice(idx, 1)
    forceUpdate()
  }

  const onSave = () => {
    if (state.length > 0) {
      axios
        .post(urlAPI + `/questionnaire/addQuestions/${user.id}`, state)
        .then((res) => {
          setMessage(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          setMessage(err);
        });
    } else {
      setMessage("Please add anything!");
    }
  };

  const renderQuestion = () => {
    return state.map((key, index) => (
      <ItemWrapper key={index}>
        <DeleteItemWrapper>
          <QuestionText>{index + 1 + ". " + key.question}</QuestionText>
          <FontAwesomeIcon
            question={key.question}
            icon={faTimesCircle}
            color="#F44336"
            onClick={() => onDeleteQuestion(index)}
          />
        </DeleteItemWrapper>
        <InputWrapper>
          <InputText
            id={`inputOption${index}`}
            type="text"
            placeholder="Add Option"
            onKeyDown={(e) => e.code == 'Enter' ? onAddOption(index) : null}
            onChange={(e) => setInputOption(e.target.value)}
          />
          <ButtonIcon
            onClick={() => onAddOption(index)}
          >
            <FontAwesomeIcon icon={faPlus} color="#00B88D" />
          </ButtonIcon>
        </InputWrapper>
        {key.options.map((val, idx) => (
          <DeleteItemWrapper>
            <QuestionText key={idx}>{val}</QuestionText>
            <FontAwesomeIcon
              icon={faTimesCircle}
              color="#F44336"
              onClick={() => onDeleteOption(index, idx)}
            />
          </DeleteItemWrapper>
        ))}
      </ItemWrapper>
    ));
  };

  if (user.fullName == "") {
    return <Redirect to="/" />;
  }
  return (
    <AddQuestionContainer>
      <AddQuestionTitle>Add Category</AddQuestionTitle>
      <QuestionBox>
        <InputWrapper>
          <InputText
            type="text"
            placeholder="Add Question"
            value={inputQuestion}
            onKeyDown={(e) => e.code == 'Enter' ? onAddQuestion() : null}
            onChange={(e) => setInputQuestion(e.target.value)}
          />
          <ButtonIcon
            type="button"
            value="Add question"
            onClick={onAddQuestion}
          >
            <FontAwesomeIcon icon={faPlus} color="#00B88D" />
          </ButtonIcon>
        </InputWrapper>
        {renderQuestion()}
      </QuestionBox>
      <SaveButton onClick={onSave}>Save</SaveButton>
      {/* <QuestionBox>
        <InputWrapper>
          <InputText
            type="text"
            placeholder="Input Category"
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
            onKeyDown={(e) => e.code == 'Enter' ? onAddCategory() : null}
          />
          <ButtonIcon
            type="button"
            value="Add question"
            onClick={onAddCategory}
          >
            <FontAwesomeIcon icon={faPlus} color="#00B88D" />
          </ButtonIcon>
        </InputWrapper>
        {renderCategory()}
      </QuestionBox> */}
    </AddQuestionContainer>
  );
};

export default AddQuestion;
