import React, {useEffect} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import Input from "../hook/input";
import Space from "../hook/space/space";
import Button from "../hook/button";
import Title from "../hook/title/Title";
import * as api from '../service/TodoService';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import avt from './image.png'

const TodoView = () => {
    const [profile, setProfile] = React.useState({});
    const [todos, setTodos] = React.useState([]);
    const [searchPayload, setSearchPayload] = React.useState({
        title: ''
    });
    const [showCreate, setShowCreate] = React.useState(false);
    const [payloadCreate, setPayloadCreate] = React.useState({
        thumbnail: null,
        title: '',
    });
    const [showEdit, setShowEdit] = React.useState(false);
    const [payloadEdit, setPayloadEdit] = React.useState(null);

    useEffect(() => {
        if (localStorage.getItem('login') === undefined
            || localStorage.getItem('login') === 'undefined'
            || !localStorage.getItem('login')) {
            window.location.href = '/login';
            return;
        } else {
            let profile = JSON.parse(localStorage.getItem('login'));
            setProfile(profile);
            setSearchPayload({...searchPayload, userId: profile.id});
        }
    }, []);

    const handleSearch = (searchPayload) => {
        api.search(searchPayload).then(res => {
            setTodos(res);
        });
    }

    useEffect(() => {
        if (searchPayload.userId) {
            handleSearch(searchPayload);
        }
    }, [searchPayload]);


    const handleCreateTodo = () => {
        if (!payloadCreate.title) {
            toast.error('Tên công việc không được để trống');
            return;
        }

        api.create({
            title: payloadCreate.title,
            userId: profile.id
        }).then(res => {
            if (!res || res?.status === 400 || res?.status === 500) {
                toast.error("Tạo mới thất bại!")
                setShowCreate(false);
                return;
            }

            handleSearch({...searchPayload, title: ''});
            setShowCreate(false);
            setPayloadCreate({});
            toast.success('Tạo công việc thành công');
        })
    }

    const handleCancelCreate = () => {
        setShowCreate(false);
        setPayloadCreate({
            title: '',
        });
        setPayloadEdit(null);
    }

    const handleDelete = (todo) => {
        api.deleteTodo(todo).then(res => {
            if (res?.status === 400 || res?.status === 500) {
                toast.error("Xóa thất bại!")
                return;
            }
            handleSearch({...searchPayload, title: ''});
            toast.success('Xoá công việc thành công');
        });
    }

    const handleEditTodo = () => {
        api.update({
            id: payloadEdit.id,
            title: payloadEdit.title,
        }).then(res => {
            if (!res || res?.status === 400 || res?.status === 500) {
                toast.error("Cập nhập thất bại!")
                setShowEdit(false);
                return;
            }
            handleSearch({...searchPayload, title: ''});
            setShowEdit(false);
            toast.success('Sửa công việc thành công');
        })

    }

    const handleCancelEdit = () => {
        setShowEdit(false);
        setPayloadEdit(null);
    }

    return (
        <div className='todo-container'>
            <div style={{display: "flex", position: "absolute", top: '10px', right: '10px'}}>
                <p>Xin chào {profile?.name}</p>
                <Space width={20}/>
                <Link to={'/login'}>Đăng xuất</Link>
            </div>
            <div className='search-box'>
                <input type="text" value={searchPayload.title}
                       onChange={(e) => setSearchPayload({...searchPayload, title: e.target.value})}/>
                <Space width={20}/>
                <Button title={'Tìm kiếm'} onClick={() => handleSearch(searchPayload)}/>
            </div>
            <div className={'button-box'}>
                <Button title={'Tạo mới'}
                        onClick={() => setShowCreate(true)}
                />
            </div>

            <Space height={20}/>

            <Title text={'Danh sách công việc'}/>
            <div className='todo-list'>
                {todos && todos.length > 0 && todos.map(todo => (
                    <div className='todo-item' key={todo.id}>
                        <img src={avt} alt=""/>
                        <p>{todo.title}</p>
                        <div style={{display: 'flex'}}>
                            <Button title={'Sửa'}
                                    onClick={() => {
                                        setPayloadEdit(todo);
                                        setShowEdit(true);
                                    }}
                                    customStyle={{backgroundColor: '#2889d8', width: '100px'}}
                            />
                            <Space width={10}/>
                            <Button title={'Xoá'}
                                    onClick={() => handleDelete(todo)}
                                    customStyle={{backgroundColor: '#d82828', width: '100px'}}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal show create */}
            <MDBModal open={showCreate} tabIndex="-1" onClose={() => setShowCreate(false)}>
                <MDBModalDialog size="fullscreen-md-down">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Thêm công việc</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none"
                                    onClick={() => setShowCreate(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div>
                                <Input value={payloadCreate?.title}
                                       onChange={(value) => setPayloadCreate({...payloadCreate, title: value})}
                                       label="Tên công việc"
                                       isRequired={true}
                                       placeHolder="Nhập tên công việc"
                                       errorMessage="Tên công việc không được để trống"
                                       error={false}
                                       isDisable={false}
                                       customStyle={{width: '100%', backgroundColor: '#f5f5f5'}}
                                />

                                <Space height={20}/>

                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button title={'Thêm'}
                                            onClick={() => handleCreateTodo()}
                                            width={'200px'}
                                    />
                                    <Button title={'Huỷ'}
                                            onClick={() => handleCancelCreate()}
                                            width={'200px'}
                                            customStyle={{backgroundColor: '#ff4e4e'}}
                                    />
                                </div>

                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {/* Modal show edit */}
            <MDBModal open={showEdit} tabIndex="-1" onClose={() => setShowEdit(false)}>
                <MDBModalDialog size="fullscreen-md-down">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Sửa công việc</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none"
                                    onClick={() => setShowEdit(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div>
                                <Input value={payloadEdit?.title}
                                       onChange={(value) => setPayloadEdit({...payloadEdit, title: value})}
                                       label="Tên công việc"
                                       isRequired={true}
                                       placeHolder="Nhập tên công việc"
                                       errorMessage="Tên công việc không được để trống"
                                       error={false}
                                       isDisable={false}
                                       customStyle={{width: '100%', backgroundColor: '#f5f5f5'}}
                                />

                                <Space height={20}/>

                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button title={'Sửa'}
                                            onClick={() => handleEditTodo()}
                                            width={'200px'}
                                    />
                                    <Button title={'Huỷ'}
                                            onClick={() => handleCancelEdit()}
                                            width={'200px'}
                                            customStyle={{backgroundColor: '#ff4e4e'}}
                                    />
                                </div>

                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
    );
}

export default TodoView;
