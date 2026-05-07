package com.taskmanager.backend.controller;

import com.taskmanager.backend.entity.Project;
import com.taskmanager.backend.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping
    public Project createProject(@RequestBody Project project) {

        return projectRepository.save(project);
    }

    @GetMapping
    public List<Project> getAllProjects() {

        return projectRepository.findAll();
    }
}