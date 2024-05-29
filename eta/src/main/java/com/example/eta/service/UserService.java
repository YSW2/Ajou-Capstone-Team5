package com.example.eta.service;

import com.example.eta.entity.User;
import com.example.eta.exception.authorization.NotFoundException;
import com.example.eta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final MailService mailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public int join(User user) {
        userRepository.save(user);
        return user.getUserId();
    }

    public User findOne(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());
    }

    public Boolean isExistEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException());
    }

    @Transactional
    public void resetPassword(String email, String tmpPassword) throws Exception{
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException());
        user.setPassword(passwordEncoder.encode(tmpPassword));
        mailService.sendMail(email, "eta 비밀번호 초기화", "<h3>아래 패스워드를 사용해 로그인하신 후 패스워드를 변경해 주세요. </h3><h1>" + tmpPassword + "</h1>");
    }
}