import React, { useEffect, useState, useReducer } from "react";
import { urlAPI } from "../../assets/URLs";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CategoryContainer,
  CategoryTitle,
  CategoryButtonIcon,
  CategoryInputText,
  CategoryInputWrapper,
  CategoryDeleteItemWrapper,
  CategoryBox,
  CategoryText,
} from "./CategoryElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  const user = useSelector((state) => state.user);


  useEffect(() => {
    axios
      .get(urlAPI + "/category/getCategory")
      .then((res) => {
        setState(res.data);
        console.log(res.data);
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

  const renderCategory = () => {
    return state.map((key, index) => (
      <CategoryDeleteItemWrapper key={key.id}>
        <CategoryText>{index + 1 + ". " + key.category_name}</CategoryText>
        <FontAwesomeIcon
          icon={faTimesCircle}
          color="#F44336"
          onClick={() => onDeleteCategory(key.id, key.category_name)}
        />
      </CategoryDeleteItemWrapper>
    ));
  };

  const onAddCategory = () => {
    if(inputCategory){
      axios.post(urlAPI + '/category/addCategory', {categoryName: inputCategory})
      .then(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Category has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        setState(res.data)
        setInputCategory("")
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      setMessage('Please add anything!')
    }
  }

  const onDeleteCategory = (id, category) => {
    Swal.fire({
      icon: "question",
      title: 'Wait...',
      text: `Are you sure to delete ${category}?`,
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(urlAPI + '/category/deleteCategory', {id})
        .then(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The category has been deleted',
            showConfirmButton: false,
            timer: 1500
          })
          setState(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
    });
  }

  if (user.fullName == "") {
    return <Redirect to="/" />;
  }
  return (
    <CategoryContainer>
      <CategoryTitle>Add Category</CategoryTitle>
      <CategoryBox>
        <CategoryInputWrapper>
          <CategoryInputText
            type="text"
            placeholder="Input Category"
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
            onKeyDown={(e) => e.code == 'Enter' ? onAddCategory() : null}
          />
          <CategoryButtonIcon
            type="button"
            value="Add question"
            onClick={onAddCategory}
          >
            <FontAwesomeIcon icon={faPlus} color="#00B88D" />
          </CategoryButtonIcon>
        </CategoryInputWrapper>
        {renderCategory()}
      </CategoryBox>
    </CategoryContainer>
  );
};

export default Category;
