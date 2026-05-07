package com.taskmanager.backend.controller;

import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        return taskRepository.save(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask) {

        Task task = taskRepository.findById(id).orElse(null);

        if (task != null) {

            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setPriority(updatedTask.getPriority());
            task.setStatus(updatedTask.getStatus());
            task.setDueDate(updatedTask.getDueDate());

            return taskRepository.save(task);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        taskRepository.deleteById(id);

        return "Task Deleted Successfully";
    }
}