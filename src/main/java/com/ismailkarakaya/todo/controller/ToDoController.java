package com.ismailkarakaya.todo.controller;

import com.ismailkarakaya.todo.assist.FrontEnd;
import com.ismailkarakaya.todo.data.entity.ToDo;
import com.ismailkarakaya.todo.services.ToDoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = FrontEnd.REACT_URL)
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

    @DeleteMapping("/deletecompleted")
    public String deleteCompleted() {
        List<ToDo> completedItems = toDoService.getCompletedTodos(true);
        for (ToDo item : completedItems) {
            toDoService.deleteToDo(item.getId());
        }
        return "redirect:/todo";
    }

    @GetMapping("/completed")
    public List<ToDo> getAllCompletedToDos(){
        return toDoService.getCompletedTodos(true);
    }

    @GetMapping("/undone")
    public List<ToDo> getUnDoneTados(){
        return toDoService.getCompletedTodos(false);
    }





}
