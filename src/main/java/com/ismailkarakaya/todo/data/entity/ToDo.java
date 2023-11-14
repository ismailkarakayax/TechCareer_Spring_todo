package com.ismailkarakaya.todo.data.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "to_do")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false, insertable = true, updatable = false)
    private Long id;
    private String task;
    private boolean completed=Boolean.FALSE;

}
