package com.ismailkarakaya.todo.controller;

import com.ismailkarakaya.todo.data.entity.ToDo;
import com.ismailkarakaya.todo.services.ToDoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {
    private final ToDoService toDoService;


    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping("/getall")
    public List<ToDo> getAllToDos(){
        return toDoService.getAllToDos();
    }

    @GetMapping("/get/{id}")
    public ToDo getToDoById(@PathVariable Long id){
        return toDoService.getToDoById(id);
    }

    @PostMapping("/create")
    public ToDo createToDo(@Valid @RequestBody ToDo toDo){
        return toDoService.createToDo(toDo);
    }

    @PutMapping("/update/{id}")
    public ToDo updateToDo(@PathVariable Long id,@RequestBody ToDo updatedToDo){
        return toDoService.updateToDo(id,updatedToDo);

    }

    @DeleteMapping("/delete/{id}")
    public void deleteToDo(@PathVariable Long id){
        toDoService.deleteToDo(id);
    }



}
