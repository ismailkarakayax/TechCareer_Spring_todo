package com.ismailkarakaya.todo.data.repository;

import com.ismailkarakaya.todo.data.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo,Long> {
}
